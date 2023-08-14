export function FileTree({ files }) {
  return (
    <div class="flex gap-2">
      <div class="flex flex-col gap-2">
        {files.map(x => (
          <a
            href={`#${x.name}`}
            class="hover:text-white duration-100 transition-colors"
          >
            {x.name}
          </a>
        ))}
      </div>
    </div>
  )
}
