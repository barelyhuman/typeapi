export default function CodeGroup({ children, name }) {
  return (
    <details class="details rounded mb-2 p-4 border-b border-zinc-800" open>
      <summary class="flex hover:cursor-pointer select-none items-center font-bold">
        {name}
        <button class="ml-auto">
          <svg
            class="opacity-75 w-4 h-4 -mr-1"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            fill="none"
            stroke-linecap="round"
            stroke-linejoin="round"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </button>
      </summary>
      {children}
    </details>
  )
}
