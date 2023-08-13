const baseUrl = `https://unpkg.com/`

export async function fetchPackageMeta(pkgName) {
  const response = await fetch(`${baseUrl}${pkgName}/package.json`)
  if (!response.ok) {
    throw new Error(await response.text())
  }
  const asJson = await response.json()
  return asJson
}

export async function fetchTypeDefinitions(pkgName, typeFilePath) {
  const urlPath = `${baseUrl}${pkgName}/${typeFilePath}`

  const response = await fetch(urlPath)
  if (!response.ok) {
    throw new Error(errText)
  }

  const defs = await response.text()
  return defs
}
