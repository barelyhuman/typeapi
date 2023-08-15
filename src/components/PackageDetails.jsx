export function PackageDetails({ name, version }) {
  return (
    <div class="flex items-end gap-2 mb-4">
      <h1 class="font-title flex items-center text-zinc-200 text-2xl">
        <span class="text-zinc-600">
          <a class="hover:text-zinc-50" href="/">
            ~
          </a>{' '}
          /
        </span>
        <span class="inline-block max-w-[150px] whitespace-nowrap overflow-hidden text-ellipsis">
          {name}
        </span>
      </h1>
      <p>
        <small class="text-xs">{version}</small>
      </p>
    </div>
  )
}
