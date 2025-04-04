export default function SearchBar({
  placeholder,
  handleSearch,
  ...rest
}: {
  placeholder: string
  handleSearch: (value: string) => void
}) {
  return (
    <input
      placeholder={placeholder}
      className="w-full rounded-lg p-2 border border-black opacity-60 placeholder-black "
      onChange={(e) => handleSearch(e.target.value)}
      {...rest}
    />
  )
}
