import CodeGroup from './CodeGroup'

export default function DeclarationRenderer({ data }) {
  return Object.keys(data).map(key => {
    return (
      <CodeGroup name={key}>
        <ul class="mt-4">
          {data[key].map((x, index) => (
            <li key={`${key}-${x.name}-${index}`} className="px-1 py-2">
              <p class="text-zinc-200">
                <strong>{x.name}</strong>
              </p>
              <pre
                class={`ml-2 p-4 select-all whitespace-pre-wrap`}
                dangerouslySetInnerHTML={{ __html: x.code }}
              ></pre>
            </li>
          ))}
        </ul>
      </CodeGroup>
    )
  })
}
