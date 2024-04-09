import { fetchPackageMeta } from '../lib/api'
import { recents as cache } from '../lib/recent'

/**
 *
 * @param {import('astro').APIContext} options
 * @returns
 */
export async function GET({ request, redirect }) {
  const sp = new URL(request.url).searchParams

  const packageName = sp.get('packageName')

  if (!packageName) {
    return redirect(`/`, 307)
  }

  try {
    await fetchPackageMeta(packageName)
    cache.add(packageName)
    return redirect(`/pkg/${packageName}`, 307)
  } catch (err) {
    return redirect(`/not-found`, 307)
  }
}
