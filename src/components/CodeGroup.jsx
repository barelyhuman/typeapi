export default function CodeGroup({ children, name }) {
  return (
    <details
      class="details border border-t-0 border-zinc-800 [&[open]_svg]:rotate-0"
      open
    >
      <summary class="p-6 tracking-wide flex hover:cursor-pointer select-none items-center font-semibold [&::-webkit-details-marker]:hidden marker:hidden">
        {name}
        <div class="ml-auto">
          <svg
            class="rotate-[270deg]"
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
            <polyline points="6 9 12 15 18 9"></polyline>
          </svg>
        </div>
      </summary>
      {children}
    </details>
  )
}
