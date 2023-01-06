import { IBM_Plex_Mono } from "@next/font/google";
import hljs from "highlight.js/lib/core";
import typescript from "highlight.js/lib/languages/typescript";
import "highlight.js/styles/nord.css";
import * as ts from "typescript";
import { fetchPackageMeta, fetchTypeDefinitions } from "../../lib/api";
import { findTypeDef, readTypescriptFileBuffer } from "../../lib/types";

const mono = IBM_Plex_Mono({ weight: ["400", "600"] });
hljs.registerLanguage("typescript", typescript);

function RenderDeclarations({ data }) {
  return Object.keys(data).map((key) => {
    return (
      <details key={key}>
        <summary>{key}</summary>
        <ul>
          {data[key].map((x, index) => (
            <li key={`${key}-${x.name}-${index}`}>
              <p>
                <strong>{x.name}</strong>
              </p>
              <pre
                className={`css-select-all ${mono.className}`}
                dangerouslySetInnerHTML={{ __html: x.code }}
              ></pre>
            </li>
          ))}
        </ul>
      </details>
    );
  });
}

export default function PackagePage({
  errorMessage,
  packageName,
  typeDefHTML,
  declarationsByKind,
  packageVersion,
}) {
  if (errorMessage) {
    return (
      <>
        <p>{errorMessage}</p>
      </>
    );
  }
  return (
    <>
      <section>
        <h3>{packageName}</h3>
        <p>
          version: <strong>{packageVersion}</strong>
        </p>
        <RenderDeclarations data={declarationsByKind} />
        <details>
          <summary>All</summary>
          <pre
            className={`css-select-all ${mono.className}`}
            dangerouslySetInnerHTML={{ __html: typeDefHTML }}
          ></pre>
        </details>
      </section>
    </>
  );
}

export async function getServerSideProps(ctx) {
  const pkgName = (ctx.query.package || []).join("/");
  let pkgData;
  try {
    pkgData = await fetchPackageMeta(pkgName);
  } catch (err) {
    return {
      props: {
        errorMessage: err.message,
      },
    };
  }

  let typeDefinitionBuffer;

  try {
    typeDefinitionBuffer = await fetchTypeDefinitions(
      pkgName,
      pkgData.types || "dist/index.d.ts"
    );
  } catch (err) {
    return {
      props: {
        errorMessage: err.message,
      },
    };
  }

  const declarations = await readTypescriptFileBuffer(typeDefinitionBuffer);

  const sourceFileCode = hljs.highlight(typeDefinitionBuffer, {
    language: "typescript",
  }).value;

  declarations.forEach(nodeCodeToHTML, {
    highlighter: (code) =>
      hljs.highlight(code, { language: "typescript" }).value,
  });

  const declarationsByKind = declarations.reduce((acc, item) => {
    (acc[item.type.label] || (acc[item.type.label] = []),
    acc[item.type.label]).push(item);

    return acc;
  }, {});

  return {
    props: {
      packageName: pkgName,
      packageVersion: pkgData.version,
      typeDefHTML: sourceFileCode,
      declarations,
      declarationsByKind,
    },
  };
}

function nodeCodeToHTML(node, index, src) {
  src[index].code = this.highlighter(node.code);
}
