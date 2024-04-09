import { useEffect, useRef } from 'preact/hooks'
import { createInputFocus } from '../lib/keymaps/input'

export default function PackageSearchForm() {
  const inputRef = useRef()

  useEffect(() => {
    if (!inputRef?.current) return
    const onCleanup = createInputFocus(inputRef.current, 'Slash')
    return () => {
      onCleanup()
    }
  }, [])

  return (
    <>
      <form method="GET" action="/pkg-redirect" class="w-full">
        <div class="relative flex items-center space-x-3 overflow-hidden rounded-md border bg-zinc-900 px-3 transition focus-within:ring">
          <label>
            <span class="sr-only">Search packages</span>
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              viewBox="0 0 24 24"
              stroke-width="2"
              stroke="currentColor"
              fill="none"
              stroke-linecap="round"
              stroke-linejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <circle cx="10" cy="10" r="7"></circle>
              <line x1="21" y1="21" x2="15" y2="15"></line>
            </svg>
          </label>
          <input
            ref={inputRef}
            class="font-mono h-12 w-full bg-transparent py-3 font-medium text-zinc-50 placeholder-zinc-500 focus:outline-none sm:h-10 sm:text-sm"
            name="packageName"
            placeholder="package[@version][@tag]"
          />
          <div class="pointer-events-none absolute right-3 flex h-6 items-center rounded-md border border-zinc-600/20 bg-zinc-600/10 px-1.5 font-mono text-[10px] font-medium text-subtle ring-muted/30 ring-offset-1 ring-offset-surface transition hover:bg-muted/20 hover:text-text focus:text-text focus:outline-none focus:ring">
            <kbd>/</kbd>
          </div>
        </div>
      </form>
    </>
  )
}
