import { fetchPackageMeta } from '../lib/api'
import { recents as cache } from '../lib/recent'

/**
 *
 * @param {import('astro').APIContext} options
 * @returns
 */
export async function get({ request, redirect }) {
  const sp = new URL(request.url).searchParams

  const packageName = sp.get('packageName')

  if (!packageName) {
    return redirect(`/`, 307)
  }

  try {
    cache.add(packageName)
    await fetchPackageMeta(packageName)
    return redirect(`/pkg/${packageName}`, 307)
  } catch (err) {
    return redirect(`/not-found`, 307)
  }
}
