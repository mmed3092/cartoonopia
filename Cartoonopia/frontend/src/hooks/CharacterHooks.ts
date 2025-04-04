import { useMutation, useQuery } from "@tanstack/react-query"
import { getSingleCharacter, getAllCharacters } from "../api/CharacterQuery"

export const useAllCharactersQuery = () => {
  return useQuery({
    queryKey: ["characters"],
    queryFn: getAllCharacters,
  })
}

export const useSingleCharacterQuery = (id: string) => {
  return useQuery({
    queryKey: ["character", id],
    queryFn: () => getSingleCharacter(id),
  })
}
