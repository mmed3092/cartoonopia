export function Panel({
  children,
  title,
  ...rest
}: {
  children: React.ReactNode
  title: string
}) {
  return (
    <div className=" flex flex-col gap-2 w-full p-10" {...rest}>
      <h1 className="text-4xl">{title}</h1>
      {children}
    </div>
  )
}

export function TableContainer({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-96 overflow-auto">
      <table
        className="w-full text-center border-separate border-spacing-0 
        [&_td]:border-b-gray-500
        [&_td]:border-opacity-50
        [&_td]:border-b-2
        [&_td]:p-3
        "
      >
        {children}
      </table>
    </div>
  )
}

export function TableHeader({ children }: { children: React.ReactNode }) {
  return (
    <thead className="bg-slate-50 top-0 sticky rounded-md border border-transparent">
      <tr className="whitespace-nowrap border border-b-black [&>*]:px-3">
        {children}
      </tr>
    </thead>
  )
}

export function TableBody({ children }: { children: React.ReactNode }) {
  return (
    <tbody className="font-semibold [&>*]:border [&>*]:border-b-black">
      {children}
    </tbody>
  )
}
