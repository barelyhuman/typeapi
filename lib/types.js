import * as ts from "typescript";

const typeMap = {
  type: {
    kind: ts.SyntaxKind.TypeAliasDeclaration,
    label: "Types",
  },
  interfaces: {
    kind: ts.SyntaxKind.InterfaceDeclaration,
    label: "Interfaces",
  },
  functions: {
    kind: ts.SyntaxKind.FunctionDeclaration,
    label: "Functions",
  },
};

export async function readTypescriptFileBuffer(filebuffer) {
  let declarations = [];
  const sourceFile = ts.createSourceFile("tmp.d.ts", filebuffer);
  ts.forEachChild(sourceFile, (child) => {
    declarations = declarations.concat(findTypeDef(child, sourceFile));
  });
  return declarations;
}

export function findTypeDef(child, sourceFile) {
  const printer = ts.createPrinter({ newLine: ts.NewLineKind.LineFeed });

  const declarations = [];
  const _internalType = Object.values(typeMap).find(
    (x) => x.kind === child.kind
  );

  switch (child.kind) {
    case ts.SyntaxKind.VariableStatement: {
      ts.forEachChild(child.declarationList, (declaration) => {
        if (declaration.type.kind === ts.SyntaxKind.FunctionType) {
          declarations.push({
            type: typeMap.functions,
            name: declaration.name.escapedText,
            code: printer.printNode(ts.EmitHint.Unspecified, child, sourceFile),
          });
        }
      });
      break;
    }
    case ts.SyntaxKind.FunctionDeclaration:
    case ts.SyntaxKind.TypeAliasDeclaration:
    case ts.SyntaxKind.InterfaceDeclaration: {
      if (child.name && child.name.kind === ts.SyntaxKind.Identifier) {
        declarations.push({
          type: _internalType,
          name: child.name.escapedText,
          code: printer.printNode(ts.EmitHint.Unspecified, child, sourceFile),
        });
      }
      break;
    }
  }

  return declarations;
}
