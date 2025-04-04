import { useParams } from "react-router-dom"
import EditCharacterComponents from "../components/EditCharactersComponents"
import { useSingleCharacterQuery } from "../hooks/CharacterHooks"
import LoadingIMG from "../components/LoadingIMG"


function EditCharacters() {
  const { id } = useParams<string>()

  if (!id) {
    return <div>No character found</div>
  }

  const { data, isLoading } = useSingleCharacterQuery(id)

  if (isLoading) {
    return <LoadingIMG />
  }

  if (!data) {
    return <div>No character found</div>
  }

  return <EditCharacterComponents character={data} />
}

export default EditCharacters
