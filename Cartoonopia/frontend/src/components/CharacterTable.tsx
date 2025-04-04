import { Link } from "react-router-dom"
import { Character } from "../types/CartoonopiaTypes"

import EditImg from "../assets/images/edit.png"
import ViewImg from "../assets/images/view.png"
import { useComparison } from "../contexts/ComparisonContext"

function CharacterTable({ characters }: { characters: Character[] }) {
  const { addComparison, removeComparison, currentComparisons } =
    useComparison()

  const handleComparison = (
    e: React.ChangeEvent<HTMLInputElement>,
    character: Character
  ) => {
    if (e.target.checked) {
      if (currentComparisons.length === 2) {
        alert("You can only compare two characters at a time")
        e.target.checked = false
      } else {
        addComparison(character)
      }
    } else {
      removeComparison(character)
    }
  }

  return (
    <>
      <table className="">
        <thead className="bg-slate-50 bg-opacity-50 ">
          <tr className="whitespace-nowrap border border-b-black ">
            <th className="px-3">Name</th>
            <th className="px-3">Strength</th>
            <th className="px-3">Speed</th>
            <th className="px-3">Skill</th>
            <th className="px-3">Fear Factor</th>
            <th className="px-3">Power</th>
            <th className="px-3">Intelligence</th>
            <th className="px-3">Wealth</th>
            <th className="px-3">Compare</th>
            <th className="px-3">View</th>
            <th className="px-3">Edit</th>
          </tr>
        </thead>
        <tbody>
          {characters.map((character) => (
            <tr
              className="whitespace-nowrap text-center font-semibold border-b border-gray-500 border-opacity-50"
              key={character.id}
            >
              <td className="text-left">{character.name}</td>
              <td className="p-2">{character.strength}</td>
              <td className="p-2">{character.speed}</td>
              <td className="p-2">{character.skill}</td>
              <td className="p-2">{character.fear_factor}</td>
              <td className="p-2">{character.power}</td>
              <td className="p-2">{character.intelligence}</td>
              <td className="p-2">{character.wealth}</td>
              <td className="">
                <input
                  type="checkbox"
                  checked={currentComparisons.includes(character)}
                  onChange={(e) => handleComparison(e, character)}
                />
              </td>
              <td className="">
                <Link
                  className="flex justify-center"
                  to={`/character/${character.id}`}
                >
                  <img className="w-6 h-6" src={ViewImg} alt="View"></img>
                </Link>
              </td>
              <td className="">
                <Link
                  className="flex justify-center"
                  to={`/edit/${character.id}`}
                >
                  <img className="w-6 h-6" src={EditImg} alt="Edit"></img>
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {characters.length === 0 && (
        <div className="text-center">No characters found</div>
      )}
    </>
  )
}

export default CharacterTable
