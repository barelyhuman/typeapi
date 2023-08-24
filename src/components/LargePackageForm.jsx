export default function LargePackageSearchForm() {
  return (
    <>
      <form method="GET" action="/pkg-redirect" class="w-full">
        <div class="relative flex items-center space-x-3 overflow-hidden rounded-md border bg-zinc-800 px-3 transition focus-within:ring">
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
            type="text"
            autoFocus
            class="h-16 w-full bg-transparent py-3 font-medium text-zinc-50 placeholder-zinc-500 font-mono focus:outline-none"
            name="packageName"
            placeholder="@barelyhuman/tocolor"
          />
        </div>

        <div class="pt-10 space-x-3 flex items-center">
          <button
            type="submit"
            class="inline-flex rounded-md bg-gradient-to-br from-zinc-400 to-white px-6 py-3 text-sm font-semibold text-black transition-shadow hover:shadow"
          >
            Generate docs
          </button>
        </div>
      </form>
    </>
  )
}
