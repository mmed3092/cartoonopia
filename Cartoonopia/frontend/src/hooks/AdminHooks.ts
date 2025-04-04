import { useMutation, useQuery } from "@tanstack/react-query"
import {
  demoteAdmin,
  getAdmins,
  getUsers,
  promoteUser,
} from "../api/AdminQuery"
import { queryClient } from "../api/QueryClient"
import { deleteContribution } from "../api/ContributionQuery"

export const useAdminsQuery = () => {
  return useQuery({
    queryKey: ["admins"],
    queryFn: () => getAdmins(),
  })
}

export const useUsersQuery = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: () => getUsers(),
  })
}

export const useDemoteAdminMutation = () => {
  return useMutation({
    mutationKey: ["demoteAdmin"],
    mutationFn: (id: string) => demoteAdmin(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"] })
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })
}

export const usePromoteUserMutation = () => {
  return useMutation({
    mutationKey: ["promoteUser"],
    mutationFn: (id: string) => promoteUser(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admins"] })
      queryClient.invalidateQueries({ queryKey: ["users"] })
    },
  })
}

export const useDeleteCharacterMutation = () => {
  return useMutation({
    mutationKey: ["deleteCharacter"],
    mutationFn: (id: string) => deleteContribution(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["changes"] })
      queryClient.invalidateQueries({ queryKey: ["characters"] })
    },
  })
}
