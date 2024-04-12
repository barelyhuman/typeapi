const FILES = Symbol('files')
const DIRS = Symbol('dirs')
import { join } from 'node:path'

function createTree(files) {
  const rootObject = groupBySplits(files.map(d => join(d)))
  const tree = splitObjectByKeys(rootObject, '.')
  return tree

  // helper defs
  function groupBySplits(paths) {
    return paths.reduce((acc, item) => {
      const paths = item.split('/')
      const root = paths[0]
      ;(acc[root] ||= []).push(item.slice(paths[0].length + 1))
      return acc
    }, {})
  }

  function splitObjectByKeys(obj, prevPath = '') {
    Object.keys(obj).forEach(k => {
      const dirs = []
      const files = []
      obj[k].forEach(o => {
        if (o.split('/').length > 1) {
          dirs.push(o)
        } else {
          files.push(o)
        }
      })
      obj[k] = {}
      obj[k][DIRS] = groupBySplits(dirs)
      if (typeof obj[k][DIRS] == 'object') {
        obj[k][DIRS] = splitObjectByKeys(obj[k][DIRS], join(prevPath, k))
      }
      obj[k][FILES] = files.map(d => join(prevPath, k, d))
    })
    return obj
  }
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

function Tree({ dirs = {}, files = [], depth }) {
  const dirNames = Object.keys(dirs).sort((x, y) =>
    x.toLocaleLowerCase().localeCompare(y.toLocaleLowerCase())
  )
  const classes = ['pl-2', 'pl-4']
  const cls = depth > 0 ? classes[1] : classes[0]
  const fileBaseNames = files
    .map(d => ({
      path: d,
      basename: d.split('/').slice(-1).join(''),
    }))
    .sort((x, y) =>
      x.basename
        .toLocaleLowerCase()
        .localeCompare(y.basename.toLocaleLowerCase())
    )

  return (
    <div class={`${cls} flex flex-col gap-2`}>
      {dirNames.map(x => {
        return (
          <>
            <div class="flex gap-1">
              <FolderIcon />
              <a
                class="font-mono hover:cursor-not-allowed"
                aria-disabled={true}
              >
                {x}
              </a>
            </div>
            <Tree
              dirs={dirs[x][DIRS]}
              files={dirs[x][FILES]}
              depth={depth + 1}
            />
          </>
        )
      })}
      {fileBaseNames.map(x => {
        return (
          <>
            <div class="flex gap-1">
              <FileIcon />
              <a
                class="font-mono hover:text-zinc-50"
                href={'#' + x.path}
                aria-label={x.path}
              >
                {x.basename}
              </a>
            </div>
          </>
        )
      })}
    </div>
  )
}
export function FileTree({ files }) {
  const normalized = files.map(x => x.name)
  const tree = createTree(normalized)
  return (
    <div class="flex min-h-[inherit] max-h-[inherit] max-w-[inherit] max-w-[260px] overflow-x-auto">
      <div class="flex flex-col gap-3 text-zinc-500">
        {Object.keys(tree).map(rootKey => {
          console.log({ rootKey, d: tree[rootKey] })
          return (
            <Tree
              dirs={tree[rootKey][DIRS]}
              files={tree[rootKey][FILES]}
              depth={0}
            />
          )
        })}
      </div>
    </div>
  )
}
