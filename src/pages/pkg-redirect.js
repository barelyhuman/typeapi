import { createClient } from '@vercel/kv'
import { fetchPackageMeta } from '../lib/api'

const { KV_REST_API_URL, KV_REST_API_TOKEN } = import.meta.env

const kv = createClient({
  url: KV_REST_API_URL,
  token: KV_REST_API_TOKEN,
})

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

    const recents = await kv.get('recents')
    const uniqueRecents = new Set([...recents])
    uniqueRecents.delete(packageName)

    kv.set('recents', [packageName, ...[...uniqueRecents].slice(0, 10)])

    return redirect(`/pkg/${packageName}`, 307)
  } catch (err) {
    return redirect(`/not-found`, 307)
  }
}
