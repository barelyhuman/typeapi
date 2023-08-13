import ts from 'typescript'
import { fetchTypeDefinitions } from './api'
import { extname } from 'path'

const typeMap = {
  type: {
    kind: ts.SyntaxKind.TypeAliasDeclaration,
    label: 'Types',
  },
  interfaces: {
    kind: ts.SyntaxKind.InterfaceDeclaration,
    label: 'Interfaces',
  },
  functions: {
    kind: ts.SyntaxKind.FunctionDeclaration,
    label: 'Functions',
  },
}

export async function readTypescriptFileBuffer(
  filebuffer,
  pkgName,
  { name } = {}
) {
  let declarations = []
  name = name || 'tmp.d.ts'
  const sourceFile = ts.createSourceFile(name, filebuffer)
  const children = []
  ts.forEachChild(sourceFile, child => {
    children.push(child)
  })

  for (let child of children) {
    const declr = await findTypeDef(child, sourceFile, pkgName)
    declarations = declarations.concat(declr)
  }
  return declarations
}

export async function findTypeDef(child, sourceFile, pkgName) {
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

  const declarations = []
  const _internalType = Object.values(typeMap).find(x => x.kind === child.kind)

  switch (child.kind) {
    case ts.SyntaxKind.ExportDeclaration: {
      // relative import
      if (child.moduleSpecifier?.text?.startsWith('./')) {
        const modName = child.moduleSpecifier?.text
        const fetchableName = modName.replace(extname(modName), '')
        const defs = await fetchTypeDefinitions(
          pkgName,
          fetchableName + '.d.ts'
        ).catch(err => false)
        if (!defs) {
          break
        }
        const declrs = await readTypescriptFileBuffer(defs, pkgName, {
          name: `${modName}.d.ts`,
        })
        declarations.push(...declrs)
      }
      break
    }

    case ts.SyntaxKind.VariableStatement: {
      ts.forEachChild(child.declarationList, declaration => {
        if (declaration?.type?.kind === ts.SyntaxKind.FunctionType) {
          declarations.push({
            type: typeMap.functions,
            name: declaration.name.escapedText,
            code: printer.printNode(ts.EmitHint.Unspecified, child, sourceFile),
          })
        }
      })
      break
    }
    case ts.SyntaxKind.FunctionDeclaration:
    case ts.SyntaxKind.TypeAliasDeclaration:
    case ts.SyntaxKind.InterfaceDeclaration: {
      if (child?.name?.kind === ts.SyntaxKind.Identifier) {
        declarations.push({
          type: _internalType,
          name: child.name.escapedText,
          code: printer.printNode(ts.EmitHint.Unspecified, child, sourceFile),
        })
      }
      break
    }
  }

  return declarations
}
