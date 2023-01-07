export default function Command({ hidePrefix = false, children }) {
  return (
    <div class="h-14 bg-zinc-800 rounded-md flex items-center overflow-x-scroll scrollbar-hide whitespace-nowrap">
      <div class="px-3 font-mono text-sm">
        {!hidePrefix && <span class="text-muted pointer-events-none">$</span>}{' '}
        {children}
      </div>
    </div>
  )
}
