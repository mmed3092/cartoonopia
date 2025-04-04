import { useState } from "react"
import { BoxWrapper } from "../components/LoginSignup"
import { Header } from "../components/LoginSignup"
import { Character } from "../types/CartoonopiaTypes"
import { useUpdateCharacterMutation } from "../hooks/ContributionHooks"
import LoadingIMG from "./LoadingIMG"
import { Link } from "react-router-dom"
function EditCharacterComponents({ character }: { character: Character }) {
  const [changeState, setChangeState] = useState<{ [key: string]: string }>({})
  const [failureReason, setFailureReason] = useState<string | null>(null)
  const editMutation = useUpdateCharacterMutation(changeState)
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.value !== e.target.defaultValue) {
      setChangeState({ ...changeState, [e.target.name]: e.target.value })
    } else {
      const { [e.target.name]: _, ...rest } = changeState
      setChangeState(rest)
    }
    e.preventDefault()
  }

  const handleEdit = (e: React.FormEvent<HTMLButtonElement>) => {
    if (Object.keys(changeState).length === 0) {
      setFailureReason("No changes made")
      return
    }
    editMutation.mutate(character.id)
    setFailureReason(null)
    e.preventDefault()
  }

  return (
    <>
      <Header heading="Edit Character" />;
      <BoxWrapper>
        <form className="space-y-5 md:space-y-5 text-center">
          <table>
            <thead>
              <tr>
                <th></th>
                <th className="w-full"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Name</td>
                <td>
                  <input
                    name="name"
                    onChange={handleChange}
                    className="bg-blue-50 border-black border  rounded-lg block w-full pl-2"
                    defaultValue={character.name}
                  />
                </td>
              </tr>
              <tr>
                <td>Subtitle</td>
                <td>
                  <input
                    name="subtitle"
                    onChange={handleChange}
                    className="bg-blue-50 border-black border  rounded-lg block w-full pl-2"
                    defaultValue={character.subtitle}
                  />
                </td>
              </tr>
              <tr>
                <td>Description</td>
                <td>
                  <textarea
                    name="description"
                    onChange={handleChange}
                    className="bg-blue-50 border-black border h-fit rounded-lg block w-full pl-2"
                    defaultValue={character.description}
                  />
                </td>
              </tr>
              <tr>
                <td>Image</td>
                <td>
                  <input
                    name="image"
                    onChange={handleChange}
                    className="bg-blue-50 border-black border  rounded-lg block w-full pl-2"
                    defaultValue={character.image_url}
                  />
                </td>
              </tr>
              <tr>
                <td>Strength</td>
                <td>
                  <input
                    name="strength"
                    type="number"
                    min={0}
                    max={100}
                    onChange={handleChange}
                    className="bg-blue-50 border-black border  rounded-lg block w-full pl-2"
                    defaultValue={character.strength}
                  />
                </td>
              </tr>
              <tr>
                <td>Speed</td>
                <td>
                  <input
                    name="speed"
                    onChange={handleChange}
                    className="bg-blue-50 border-black border  rounded-lg block w-full pl-2"
                    type="number"
                    min={0}
                    max={100}
                    defaultValue={character.speed}
                  />
                </td>
              </tr>
              <tr>
                <td>Skill</td>
                <td>
                  <input
                    name="skill"
                    onChange={handleChange}
                    className="bg-blue-50 border-black border  rounded-lg block w-full pl-2"
                    type="number"
                    min={0}
                    max={100}
                    defaultValue={character.skill}
                  />
                </td>
              </tr>
              <tr>
                <td>Fear Factor</td>
                <td>
                  <input
                    name="fear_factor"
                    onChange={handleChange}
                    className="bg-blue-50 border-black border  rounded-lg block w-full pl-2"
                    type="number"
                    min={0}
                    max={100}
                    defaultValue={character.fear_factor}
                  />
                </td>
              </tr>
              <tr>
                <td>Power</td>
                <td>
                  <input
                    name="power"
                    onChange={handleChange}
                    className="bg-blue-50 border-black border  rounded-lg block w-full pl-2"
                    type="number"
                    min={0}
                    max={100}
                    defaultValue={character.power}
                  />
                </td>
              </tr>
              <tr>
                <td>Intelligence</td>
                <td>
                  <input
                    name="intelligence"
                    onChange={handleChange}
                    className="bg-blue-50 border-black border  rounded-lg block w-full pl-2"
                    type="number"
                    min={0}
                    max={100}
                    defaultValue={character.intelligence}
                  />
                </td>
              </tr>
              <tr>
                <td>Wealth</td>
                <td>
                  <input
                    name="wealth"
                    onChange={handleChange}
                    className="bg-blue-50 border-black border  rounded-lg block w-full pl-2"
                    type="number"
                    min={0}
                    max={100}
                    defaultValue={character.wealth}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div className="flex flex-col gap-4">
            <button
              type="button"
              onClick={handleEdit}
              className="w-full px-4 py-2 text-white bg-blue-700 hover:bg-gray-500 rounded-md"
            >
              Submit Edit
            </button>
            <Link to="/" relative="path">
              <button className="w-full px-4 py-2 text-white bg-gray-700 hover:bg-gray-500 rounded-md">
                Back to Home
              </button>
            </Link>
          </div>
          {editMutation.isError && (
            <div className="text-red-400">
              Error: {editMutation.error.message}
            </div>
          )}

          {failureReason && <div className="text-red-400">{failureReason}</div>}
          {editMutation.isPending && <LoadingIMG className="w-1 h-1" />}
          {editMutation.isSuccess && (
            <div>
              <div className="text-green-400">Success</div>
              <div>Character edit contribution added!</div>
              Changes Made:
              {changeState &&
                Object.keys(changeState).map((key) => (
                  <div key={key}>
                    {key}: {changeState[key]}
                  </div>
                ))}
            </div>
          )}
        </form>
      </BoxWrapper>
    </>
  )
}

export default EditCharacterComponents
