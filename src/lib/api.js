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
  const response = await fetch(`${baseUrl}${pkgName}/${typeFilePath}`)
  if (!response.ok) {
    throw new Error(await response.text())
  }
  const defs = await response.text()
  return defs
}
