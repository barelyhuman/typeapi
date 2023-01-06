export default function PackageForm() {
  return (
    <>
      <form method="POST" action="/get-package-link">
        <input name="packageName" placeholder="package[@version][@tag]" />
      </form>
    </>
  )
}
