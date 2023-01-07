import { fetchPackageMeta } from '../lib/api'

/**
 *
 * @param {import('astro').APIContext} options
 * @returns
 */
export async function get({ request, redirect, params }) {
  const sp = new URL(request.url).searchParams

  const packageName = sp.get('packageName')

  if (!packageName) {
    return redirect(`/`, 307)
  }

  try {
    await fetchPackageMeta(packageName)
    return redirect(`/pkg/${packageName}`, 307)
  } catch (err) {
    return redirect(`/not-found`, 307)
  }
}
