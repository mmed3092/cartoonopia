import React, { useState } from "react"
import { useAllCharactersQuery } from "../hooks/CharacterHooks"
import CharacterTable from "../components/CharacterTable"
import FilterControls from "../components/FilterTable" // Ensure this matches the actual file and export
import { Character } from "../types/CartoonopiaTypes"
import ComparisonBox from "../components/ComparisonBox"
import ComparisonHistory from "../components/ComparisonHistory"
import { Link } from "react-router-dom"

function Home() {
  const { data, isLoading, error } = useAllCharactersQuery()
  const [searchTerm, setSearchTerm] = useState("")
  const [filters, setFilters] = useState({
    strengthMin: 0,
    strengthMax: 100,
    speedMin: 0,
    speedMax: 100,
    skillMin: 0,
    skillMax: 100,
    fearFactorMin: 0,
    fearFactorMax: 100,
    powerMin: 0,
    powerMax: 100,
    intelligenceMin: 0,
    intelligenceMax: 100,
    wealthMin: 0,
    wealthMax: 100,
  })

  if (isLoading) {
    return <div>Loading...</div>
  }
  if (error) {
    return <div>Error: {error.message}</div>
  }
  if (!data) {
    return <div>No data</div>
  }

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, max, min } = e.target
    const val = Math.max(Number(min), Math.min(Number(max), Number(value)))
    setFilters((prev) => ({ ...prev, [name]: val }))
  }

  const applyFilters = () => {
    let filteredData: Character[] = data

    filteredData = data.filter(
      (character) =>
        searchTerm === "" ||
        character.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    filteredData = filteredData.filter(
      (character) =>
        character.strength >= filters.strengthMin &&
        character.strength <= filters.strengthMax
    )
    filteredData = filteredData.filter(
      (character) =>
        character.speed >= filters.speedMin &&
        character.speed <= filters.speedMax
    )
    filteredData = filteredData.filter(
      (character) =>
        character.fear_factor >= filters.fearFactorMin &&
        character.fear_factor <= filters.fearFactorMax
    )
    filteredData = filteredData.filter(
      (character) =>
        character.power >= filters.powerMin &&
        character.power <= filters.powerMax
    )
    filteredData = filteredData.filter(
      (character) =>
        character.skill >= filters.skillMin &&
        character.skill <= filters.skillMax
    )
    filteredData = filteredData.filter(
      (character) =>
        character.intelligence >= filters.intelligenceMin &&
        character.intelligence <= filters.intelligenceMax
    )
    filteredData = filteredData.filter(
      (character) =>
        character.wealth >= filters.wealthMin &&
        character.wealth <= filters.wealthMax
    )
    return filteredData
  }

  return (
    <>
      <div className="z-20 flex flex-row content-center py-4 justify-around">
        <FilterControls filters={filters} onFilterChange={handleFilterChange} />
        <div className="flex flex-col gap-4">
          <div className="flex gap-2">

          <input
            type="text"
            placeholder="Search Characters"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg p-2 border border-black opacity-60 placeholder-black "
            />
            <Link to="/newCharacter">
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
              Add new Character
              </button>
            </Link>
            </div>
          <CharacterTable characters={applyFilters()} />
        </div>
        <ComparisonHistory />
      </div>
      <ComparisonBox />
    </>
  )
}

export default Home
