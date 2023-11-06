export function PackageDetails({ name, version }) {
  return (
    <div class="flex mb-6">
      <a
        class="font-mono inline-block text-zinc-600 hover:text-zinc-50"
        href="/"
      >
        ~/
      </a>
      <h1 class="font-mono text-zinc-200 inline-block max-w-[260px] truncate">
        {name}
      </h1>
      <div class="flex-1"></div>
      <p class="pl-2">
        <small class="text-[11px] font-mono">{version}</small>
      </p>
    </div>
  )
}
