export default function PackageSearchForm() {
  return (
    <>
      <form method="GET" action="/pkg-redirect">
        <div class="relative flex h-12 w-full max-w-sm items-center space-x-3 overflow-hidden rounded-md border bg-zinc-800 px-3 transition focus-within:ring">
          <label>
            <svg
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
            class="h-12 w-full bg-transparent py-3 text-sm font-medium text-zinc-50 placeholder-zinc-600 focus:outline-none sm:h-10"
            name="packageName"
            placeholder="package[@version][@tag]"
          />
        </div>
      </form>
    </>
  )
}
