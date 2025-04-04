import { useMutation, useQuery } from "@tanstack/react-query"
import {
  updateContribution,
  addContribution,
  getUserContributions,
  revokeContribution,
  getAdminContributions,
} from "../api/ContributionQuery"

import {
  approveContribution,
  getChanges,
  rejectContribution,
} from "../api/AdminQuery"

import { queryClient } from "../api/QueryClient"

export const useUpdateCharacterMutation = (contribution: {
  [key: string]: string
}) => {
  return useMutation({
    mutationKey: ["updateCharacter"],
    mutationFn: (id: string) => updateContribution(id, contribution),
  })
}

export const useAddCharacterMutation = () => {
  return useMutation({
    mutationKey: ["addCharacter"],
    mutationFn: (contribution: { [key: string]: string }) =>
      addContribution(contribution),
  })
}

export const useRevokeCharacterMutation = () => {
  return useMutation({
    mutationKey: ["revokeCharacter"],
    mutationFn: (id:string) => revokeContribution(id),
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ["contributions"]})
    }
  })
}

export const useContributionQuery = () => {
  return useQuery({
    queryKey: ["contributions", "user"],
    queryFn: getUserContributions,
  })
}

export const useAdminContributionQuery = () => {
  return useQuery({
    queryKey: ["contributions", "admin"],
    queryFn: getAdminContributions,
  })
}

export const useApproveContributionMutation = () => {
  return useMutation({
    mutationKey: ["approveContribution"],
    mutationFn: (id: string) => approveContribution(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contributions", "admin"] })
      queryClient.invalidateQueries({ queryKey: ["changes"] })
    },
  })
}

export const useRejectContributionMutation = () => {
  return useMutation({
    mutationKey: ["approveContribution"],
    mutationFn: (id: string) => rejectContribution(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["contributions", "admin"] })
      queryClient.invalidateQueries({ queryKey: ["changes"] })
    },
  })
}

export const useChangesQuery = () => {
  return useQuery({
    queryKey: ["changes"],
    queryFn: () => getChanges(),
  })
}
