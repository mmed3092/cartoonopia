import { useMutation, useQuery } from "@tanstack/react-query"
import { toggleFavourite, getIsFavourites, getAllFavourites } from "../api/FavouritesQuery"
import { queryClient } from "../api/QueryClient"


export function useToggleFavourite(id: string){
    return useMutation({
        mutationKey: ["favourite", id],
        mutationFn: () => toggleFavourite(id),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["favourites"]})
        } 
    })
}

export function useGetIsFavourites(id: string){
    return useQuery({
        queryKey: ["favourites", id],
        queryFn: () => getIsFavourites(id)
    })
}

export function useGetAllFavourites(){
    return useQuery({
        queryKey: ["favourites"],
        queryFn: () => getAllFavourites()
    })
}