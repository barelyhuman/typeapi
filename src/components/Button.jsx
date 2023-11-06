/**
 * @param {string} children
 * @param {string} [variant]
 * @param {string} [href]
 * @param {object} props
 * @returns {JSX.Element}
 */
export default function Button({
  children,
  variant = 'primary',
  href,
  ...props
}) {
  const Tag = href ? 'a' : 'button'
  const variants = {
    primary: 'bg-gradient-to-br from-zinc-400 to-zinc-50 text-zinc-950',
    secondary:
      'bg-zinc-900 text-zinc-200 transition hover:bg-zinc-800/50 hover:text-zinc-50',
  }

  return (
    <Tag
      href={href}
      {...props}
      class={`${variants[variant]} inline-flex rounded-md px-6 py-3 text-sm font-semibold`}
    >
      {children}
    </Tag>
  )
}
