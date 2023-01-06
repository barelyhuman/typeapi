export async function post({ params, request }) {
  const fd = await request.formData()
  const [packageName] = fd.getAll('packageName')
  return new Response({
    status: 303,
    headers: {
      Location: `/pkg/${packageName}`,
    },
  })
}
