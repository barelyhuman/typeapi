import { createClient } from '@vercel/kv'
import { fetchPackageMeta } from '../lib/api'

async function setRecents(packageName) {
  try {
    const { KV_REST_API_URL, KV_REST_API_TOKEN } = import.meta.env

    const kv = createClient({
      url: KV_REST_API_URL,
      token: KV_REST_API_TOKEN,
    })

    let recents = await kv.get('recents')
    if (!recents) {
      recents = [
        '@barelyhuman/tocolor@next',
        '@barelyreaper/themer',
        'spacery',
        'jotai-form',
        'sizesnap',
        'pinecone-cli',
        '@rose-pine/build',
      ]
    }
    const uniqueRecents = new Set([...recents])
    uniqueRecents.delete(packageName)

    kv.set('recents', [packageName, ...[...uniqueRecents].slice(0, 10)])
  } catch (e) {}
}

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
    await fetchPackageMeta(packageName)
    await setRecents(packageName)

    return redirect(`/pkg/${packageName}`, 307)
  } catch (err) {
    return redirect(`/not-found`, 307)
  }
}
