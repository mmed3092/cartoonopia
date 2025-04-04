import React from "react"

interface FilterControlsProps {
  filters: {
    strengthMin: number
    strengthMax: number
    speedMin: number
    speedMax: number
    skillMin: number
    skillMax: number
    fearFactorMin: number
    fearFactorMax: number
    powerMin: number
    powerMax: number
    intelligenceMin: number
    intelligenceMax: number
    wealthMin: number
    wealthMax: number
  }
  onFilterChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const FilterControls: React.FC<FilterControlsProps> = ({
  filters,
  onFilterChange,
}) => {
  return (
    <div className="items-center flex">
      <div className="flex flex-col bg-white w-fit p-6 border-black border shadow-md gap-4 shadow-black">
        <h1 className="text-left">Filters</h1>
        <hr />
        <table className="border-separate border-spacing-2">
          <thead>
            <tr>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Strength</td>
              <td>
                <input
                  className="border-black border text-center"
                  type="number"
                  name="strengthMin"
                  value={filters.strengthMin}
                  min={0}
                  max={filters.strengthMax}
                  onChange={onFilterChange}
                  required
                />
              </td>
              <td>
                <input
                  className="border-black border text-center"
                  type="number"
                  name="strengthMax"
                  value={filters.strengthMax}
                  min={filters.strengthMin}
                  max={100}
                  onChange={onFilterChange}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Speed</td>
              <td>
                <input
                  className="border-black border text-center"
                  type="number"
                  name="speedMin"
                  value={filters.speedMin}
                  onChange={onFilterChange}
                  min={0}
                  max={filters.speedMax}
                  required
                />
              </td>
              <td>
                <input
                  className="border-black border text-center"
                  type="number"
                  name="speedMax"
                  value={filters.speedMax}
                  onChange={onFilterChange}
                  min={filters.speedMin}
                  max={100}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Skill</td>
              <td>
                <input
                  className="border-black border text-center"
                  type="number"
                  name="skillMin"
                  value={filters.skillMin}
                  onChange={onFilterChange}
                  min={0}
                  max={filters.skillMax}
                  required
                />
              </td>
              <td>
                <input
                  className="border-black border text-center"
                  type="number"
                  name="skillMax"
                  value={filters.skillMax}
                  onChange={onFilterChange}
                  min={filters.skillMin}
                  max={100}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Fear Factor</td>
              <td>
                <input
                  className="border-black border text-center"
                  type="number"
                  name="fearFactorMin"
                  value={filters.fearFactorMin}
                  onChange={onFilterChange}
                  min={0}
                  max={filters.fearFactorMax}
                  required
                />
              </td>
              <td>
                <input
                  className="border-black border text-center"
                  type="number"
                  name="fearFactorMax"
                  value={filters.fearFactorMax}
                  onChange={onFilterChange}
                  min={filters.fearFactorMin}
                  max={100}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Power</td>
              <td>
                <input
                  className="border-black border text-center"
                  type="number"
                  name="powerMin"
                  value={filters.powerMin}
                  onChange={onFilterChange}
                  min={0}
                  max={filters.powerMax}
                  required
                />
              </td>
              <td>
                <input
                  className="border-black border text-center"
                  type="number"
                  name="power"
                  value={filters.powerMax}
                  onChange={onFilterChange}
                  min={filters.powerMin}
                  max={100}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Intelligence</td>
              <td>
                <input
                  className="border-black border text-center"
                  type="number"
                  name="intelligenceMin"
                  value={filters.intelligenceMin}
                  onChange={onFilterChange}
                  min={0}
                  max={filters.intelligenceMax}
                  required
                />
              </td>
              <td>
                <input
                  className="border-black border text-center"
                  type="number"
                  name="intelligenceMax"
                  value={filters.intelligenceMax}
                  onChange={onFilterChange}
                  min={filters.intelligenceMin}
                  max={100}
                  required
                />
              </td>
            </tr>
            <tr>
              <td>Wealth</td>
              <td>
                <input
                  className="border-black border text-center"
                  type="number"
                  name="wealthMin"
                  value={filters.wealthMin}
                  onChange={onFilterChange}
                  min={0}
                  max={filters.wealthMax}
                  required
                />
              </td>
              <td>
                <input
                  className="border-black border text-center"
                  type="number"
                  name="wealthMax"
                  value={filters.wealthMax}
                  onChange={onFilterChange}
                  min={filters.wealthMin}
                  max={100}
                  required
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default FilterControls
