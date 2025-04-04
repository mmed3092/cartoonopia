import { useComparison } from "../contexts/ComparisonContext"

function ComparisonHistory() {
  const { comparisonHistory, setComparison } = useComparison()

  return (
    <div className="flex flex-col align-middle justify-center">
      <div className="border-black border shadow-black shadow-md p-4 flex flex-col gap-4 bg-white">
        <h2 className="text-left">Comparison History</h2>
        <hr />
        <div className="flex flex-col">
          {comparisonHistory.map((pair) => (
            <button
              key={pair[0].id + pair[1].id}
              onClick={() => setComparison(pair[0], pair[1])}
            >
              <div className="flex justify-between gap-4">
                <div>{pair[0].name}</div>
                <div>{pair[1].name}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ComparisonHistory
