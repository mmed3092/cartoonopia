import { useContributionQuery } from "../hooks/ContributionHooks"
import { Contribution } from "../types/CartoonopiaTypes"
import LoadingIMG from "./LoadingIMG"
import { useRevokeCharacterMutation } from "../hooks/ContributionHooks";
import { useGetAllFavourites } from "../hooks/FavouriteHooks";
import { Panel, TableBody, TableContainer, TableHeader } from "./TableComponents";
import { useComparison } from "../contexts/ComparisonContext";



function UserProfileComponents() {
  return (
    <>
      <div className="flex flex-col justify-center items-center w-full">
          <FavouriteCharacters />
          <PreviousComparisons />
          <Contributions />
      </div>
    </>
  )
}

function FavouriteCharacters() {
  const {data, isLoading, isSuccess, isError, error} = useGetAllFavourites()
  return (
    <Panel title="Favourite Characters">
      <TableContainer>
        <TableHeader>
          <th>Character</th>
        </TableHeader>
        <TableBody>
          <tr>
            {isError && (
              <div className="text-red-300">
                Error fetching data: {(error.message)}
              </div>
            )}
            {isLoading && <LoadingIMG className="w-1 h-1" />}
            {isSuccess && data && (
              <div>
                {data.map((character) => (
                  <div key={character}>{character}</div>
                ))}
              </div>
            )}
            </tr>
        </TableBody>
      </TableContainer>
    </Panel>
  )
}

function PreviousComparisons() {
  const {comparisonHistory} = useComparison()
  return (
    <Panel title="Previous Comparisons">
      <TableContainer>
        <TableHeader>
          <th>Character 1</th>
          <th>Character 2</th>
        </TableHeader>
        <TableBody>
            {
              comparisonHistory.map((comparison, i) => {
              const [c1, c2] = comparison
              return  <tr key={i}>
                <td>{c1.name}</td>
                <td>{c2.name}</td>
                </tr>
              })
            }
        </TableBody>
      </TableContainer>
    </Panel>
  )
}

function Contributions() {
  const { data, isLoading, isError, isSuccess, error } = useContributionQuery()
  const revokeMutation = useRevokeCharacterMutation();


  const handleClick = (contributionID:string) => {
    revokeMutation.mutate(contributionID);

  }

  return (
    <Panel title="My Contributions">
      <div>
        {isError && (
          <div className="text-red-300">
            Error fetching data: {JSON.stringify(error)}
          </div>
        )}
        {isLoading && <LoadingIMG className="w-1 h-1" />}
        {isSuccess && data && (
          <TableContainer>
            <TableHeader>
              <th>#</th>
              <th>Date</th>
              <th>Character ID</th>
              <th>Status</th>
              <th>Action</th>
              <th>Revoke</th>
            </TableHeader>
            <TableBody>
            {data.map((contribution: Contribution, i: number) => {
              let date_str = new Date(contribution.date).toLocaleString()
              return (
                <tr key={contribution.contribution_id}>
                  <td>{i + 1}</td>
                  <td>{date_str}</td>
                  <td>{contribution.data.id}</td>
                  <td>{contribution.status}</td>
                  <td>{contribution.action}</td>
                  <td>
                    <button type="button" className="rounded-lg bg-red-400 p-2" onClick={() => handleClick(contribution.contribution_id)}>
                      Revoke
                    </button>
                  </td>
                </tr>
              )
            })}
            </TableBody>
          </TableContainer>
        )}
      </div>
    </Panel>
  )
}

export default UserProfileComponents
