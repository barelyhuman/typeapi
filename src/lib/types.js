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

export async function collectDeclarations(sourcefile) {
  let declarations = []
  const children = []
  ts.forEachChild(sourcefile, child => {
    children.push(child)
  })

  for (let child of children) {
    const declr = await findTypeDef(child, sourcefile)
    declarations = declarations.concat(declr)
  }
  return declarations
}

export async function readTypescriptFileBuffer(filebuffer, { name } = {}) {
  let declarations = []
  name = name || 'tmp.d.ts'
  const sourceFile = ts.createSourceFile(name, filebuffer)
  const children = []
  ts.forEachChild(sourceFile, child => {
    children.push(child)
  })

  for (let child of children) {
    const declr = await findTypeDef(child, sourceFile)
    declarations = declarations.concat(declr)
  }
  return declarations
}

export async function findTypeDef(child, sourceFile) {
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed })

  const declarations = []
  const _internalType = Object.values(typeMap).find(x => x.kind === child.kind)

  switch (child.kind) {
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

export async function getTypeDefFiles(entryTypeDef, pkgName) {
  // entry type def file
  const entrySourceFile = ts.createSourceFile('index.d.ts', entryTypeDef)
  const relativeFiles = []

  relativeFiles.push({
    name: 'index.d.ts',
    typeDefs: entryTypeDef,
    sourceFile: entrySourceFile,
  })

  const children = []
  ts.forEachChild(entrySourceFile, child => {
    children.push(child)
  })

  for (let child of children) {
    if (child.kind !== ts.SyntaxKind.ExportDeclaration) continue

    // Handle relative exports
    // ./another-module
    if (child.moduleSpecifier?.text?.startsWith('./')) {
      const modName = child.moduleSpecifier?.text
      const fetchableName = modName.replace(extname(modName), '') + '.d.ts'
      const defs = await fetchTypeDefinitions(pkgName, fetchableName).catch(
        err => false
      )
      if (!defs) {
        continue
      }

      relativeFiles.push({
        name: fetchableName,
        typeDefs: defs,
        sourceFile: ts.createSourceFile(fetchableName, defs),
      })
    }

    // TODO: handle aliased exports
    // pkgName/another-module
    // can simple re-do the package fetching sequence but would like to
    // avoid re-fetching details for the same package again
    // Need to move the logic from the [...pkgName] route to a helper
    // function first
  }

  return relativeFiles
}
