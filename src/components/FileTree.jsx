const __children = Symbol.for('children')
const __path = Symbol.for('path')
const __parent = Symbol.for('parent')

function createTree(files) {
  const tree = {}

  // Circular Root
  tree['.'] = {
    [__children]: {},
    [__path]: '.',
  }

  // Circular Root
  tree['.'][__parent] = tree['.']
  const wordRegex = /(\w+\s*)+/

  for (const file of files) {
    let pointer = tree['.']
    const pathSplits = file.split('/')
    for (let i = 0; i < pathSplits.length; i++) {
      const p = pathSplits[i]
      const prev = pathSplits[i - 1]
      const next = pathSplits[i + 1]

      if (p == '.') continue
      if (p == '..') {
        pointer = pointer[__parent]
        continue
      }

      if (!wordRegex.test(p)) continue

      if (prev && wordRegex.test(prev)) {
        const parentExists = Object.keys(pointer[__children]).includes(prev)

        if (parentExists) {
          pointer = pointer[__children][prev]
        }
      }

      pointer[__children][p] = {
        isFile: next === undefined ? true : false,
        [__path]: [pointer[__path], p].join('/'),
        [__parent]: pointer,
        [__children]: {},
      }
    }
  }

  return tree
}

function FileIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      stroke-width="1"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
      <path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2h-1"></path>
      <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
      <path d="M9 20.25c0 .414 .336 .75 .75 .75h1.25a1 1 0 0 0 1 -1v-1a1 1 0 0 0 -1 -1h-1a1 1 0 0 1 -1 -1v-1a1 1 0 0 1 1 -1h1.25a.75 .75 0 0 1 .75 .75"></path>
      <path d="M3.5 15h3"></path>
      <path d="M5 15v6"></path>
    </svg>
  )
}

function FolderIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="20"
      height="20"
      viewBox="0 0 24 24"
      stroke-width="1"
      stroke="currentColor"
      fill="none"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
      <path d="M5 19l2.757 -7.351a1 1 0 0 1 .936 -.649h12.307a1 1 0 0 1 .986 1.164l-.996 5.211a2 2 0 0 1 -1.964 1.625h-14.026a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v2"></path>
    </svg>
  )
}

function Tree({ files, depth }) {
  const fileNames = Object.keys(files)
  const classes = ['pl-2', 'pl-4']
  const cls = depth > 0 ? classes[1] : classes[0]

  return (
    <div class={`${cls} flex flex-col gap-2`}>
      {fileNames.map(x => (
        <>
          <div class="flex gap-1">
            {depth > 0 && <span class="font-mono text-zinc-700">-</span>}
            {files[x].isFile ? <FileIcon /> : <FolderIcon />}
            <a
              class="font-mono hover:text-zinc-50"
              href={'#' + files[x][__path]}
            >
              {x}
            </a>
          </div>
          {files[x][__children] && (
            <Tree files={files[x][__children]} depth={depth + 1} />
          )}
        </>
      ))}
    </div>
  )
}
export function FileTree({ files }) {
  const normalized = files.map(x => x.name)
  const tree = createTree(normalized)

  return (
    <div class="flex max-w-[250px] overflow-x-auto">
      <div class="flex flex-col gap-3 text-zinc-500">
        <Tree files={tree['.'][__children]} depth={0} />
      </div>
    </div>
  )
}
