export function PackageDetails({ name, version }) {
  return (
    <div class="flex items-end gap-2 mb-4">
      <h1 class="font-title text-zinc-200 text-2xl">
        <span class="text-zinc-600">
          <a class="hover:text-zinc-50" href="/">
            ~
          </a>{' '}
          /
        </span>
        {name}
        {/* {pkgName} */}
      </h1>
      <p>
        <small class="text-xs">
          {version}
          {/* {pkgMeta.version} */}
        </small>
      </p>
    </div>
  )
}
