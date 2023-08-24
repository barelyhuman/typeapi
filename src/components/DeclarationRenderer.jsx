import CodeGroup from './CodeGroup'

export default function DeclarationRenderer({ data }) {
  return Object.keys(data).map(key => {
    return (
      <CodeGroup name={key}>
        <ul class="mt-4">
          {data[key].map((x, index) => (
            <li key={`${key}-${x.name}-${index}`}>
              <p class="font-mono text-zinc-200 px-6">
                <strong>{x.name}</strong>
              </p>
              <pre
                class={`ml-4 px-4 pb-6 pt-1.5 select-all whitespace-pre-wrap`}
                dangerouslySetInnerHTML={{ __html: x.code }}
              ></pre>
            </li>
          ))}
        </ul>
      </CodeGroup>
    )
  })
}
