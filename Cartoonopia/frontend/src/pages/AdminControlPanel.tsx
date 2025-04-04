import { useEffect, useState } from "react"
import {
  useAdminContributionQuery,
  useApproveContributionMutation,
  useChangesQuery,
  useRejectContributionMutation,
} from "../hooks/ContributionHooks"
import LoadingIMG from "../components/LoadingIMG"
import { Change, Character, User } from "../types/CartoonopiaTypes"
import { useAllCharactersQuery } from "../hooks/CharacterHooks"
import {
  Panel,
  TableBody,
  TableContainer,
  TableHeader,
} from "../components/TableComponents"
import {
  useAdminsQuery,
  useDeleteCharacterMutation,
  useDemoteAdminMutation,
  usePromoteUserMutation,
  useUsersQuery,
} from "../hooks/AdminHooks"
import SearchBar from "../components/SearchBar"

function AdminControlPanel() {
  return (
    <div className="flex flex-col gap-10 p-10">
      <ContributionPanel />
      <ChangeHistoryPanel />
      <CharacterDeletePanel />
      <PromoteUserPanel />
      <DemoteAdminPanel />
    </div>
  )
}

function ContributionPanel() {
  const { data, isFetching, isSuccess, isError, error } =
    useAdminContributionQuery()
  const approveMutation = useApproveContributionMutation()
  const rejectMutation = useRejectContributionMutation()

  return (
    <Panel title="Pending Contributions">
      {approveMutation.isError && (
        <div className="text-red-400">
          Error: {approveMutation.error.message}
        </div>
      )}
      {rejectMutation.isError && (
        <div className="text-red-400">
          Error: {rejectMutation.error.message}
        </div>
      )}
      <TableContainer>
        <TableHeader>
          <th>Contribution #</th>
          <th>Date</th>
          <th>Character</th>
          <th>Action</th>
          <th>Status</th>
          <th>User</th>
          <th>Changes</th>
          <th></th>
        </TableHeader>
        <TableBody>
          {isFetching && (
            <tr>
              <td className="col-span-8">
                <LoadingIMG className="w-1 h-1" />
              </td>
            </tr>
          )}
          {isError ? (
            <tr>
              <td colSpan={100}>{error.message}</td>
            </tr>
          ) : isSuccess && data.length > 0 ? (
            data.map((con, i) => {
              const date = new Date(con.date)
              return (
                <tr key={i} className="">
                  <td>{con.contribution_id}</td>
                  <td>{date.toLocaleString()}</td>
                  <td>{con.data.id}</td>
                  <td>{con.action}</td>
                  <td>{con.status}</td>
                  <td>{con.user_id}</td>
                  <td>
                    {Object.keys(con.data)
                      .filter((value) => value !== "id")
                      .map((change) => {
                        return (
                          <div key={change}>
                            <div className="font-bold">{change}</div>
                            {JSON.stringify(
                              con.data[change as keyof typeof con.data]
                            )}
                          </div>
                        )
                      })}
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <button
                        className="bg-green-500 p-2 rounded-lg"
                        onClick={() =>
                          approveMutation.mutate(con.contribution_id)
                        }
                      >
                        Approve
                      </button>
                      <button
                        className="bg-red-500 p-2 rounded-lg"
                        onClick={() =>
                          rejectMutation.mutate(con.contribution_id)
                        }
                      >
                        Reject
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })
          ) : (
            <tr>
              <td colSpan={100}>No contributions</td>
            </tr>
          )}
        </TableBody>
      </TableContainer>
    </Panel>
  )
}

function ChangeHistoryPanel() {
  const { data, isError, isFetching, isSuccess, error } = useChangesQuery()
  console.log(data)
  return (
    <>
      <Panel title="Change History">
        <TableContainer>
          <TableHeader>
            <th>Date</th>
            <th>Character</th>
            <th>Action</th>
            <th>User</th>
            <th>Approver</th>
            <th>Old Data</th>
            <th>New Data</th>
          </TableHeader>
          <TableBody>
            {isFetching && (
              <tr>
                <td colSpan={100} className="flex justify-center items-center">
                  <LoadingIMG />
                </td>
              </tr>
            )}
            {isError ? (
              <tr>
                <td colSpan={100}>{error.message}</td>
              </tr>
            ) : isSuccess && data.length > 0 ? (
              data.map((change: Change, i) => {
                const date = new Date(change.date)
                return (
                  <tr key={i} className="[&>*]:px-3">
                    <td>{date.toLocaleString()}</td>
                    <td>{change.character_id}</td>
                    <td>{change.action}</td>
                    <td>{change.user_id}</td>
                    <td>{change.reviewed_by}</td>
                    <td>
                      {Object.keys(change.old_data)
                        .filter((value) => value !== "id")
                        .map((key) => {
                          return (
                            <div key={key}>
                              <div className="font-extrabold underline">
                                {key}
                              </div>
                              {JSON.stringify(
                                change.old_data[
                                  key as keyof typeof change.old_data
                                ]
                              )}
                            </div>
                          )
                        })}
                    </td>
                    <td>
                      {Object.keys(change.new_data)
                        .filter((value) => value !== "id")
                        .map((key) => {
                          return (
                            <div key={key}>
                              <div className="font-extrabold underline">
                                {key}
                              </div>
                              {JSON.stringify(
                                change.new_data[
                                  key as keyof typeof change.new_data
                                ]
                              )}
                            </div>
                          )
                        })}
                    </td>
                  </tr>
                )
              })
            ) : (
              <tr>
                <td colSpan={100}>No changes</td>
              </tr>
            )}
          </TableBody>
        </TableContainer>
      </Panel>
    </>
  )
}

function CharacterDeletePanel() {
  const { data, isSuccess, isError, error, isPending } = useAllCharactersQuery()
  const deleteMutation = useDeleteCharacterMutation()

  const [characters, setCharacters] = useState<Character[]>([])

  useEffect(() => {
    if (data) {
      setCharacters(data)
    }
  }, [data])

  const handleSearch = (searchTerm: string) => {
    if (data) {
      if (searchTerm === "") {
        setCharacters(data)
      } else {
        setCharacters(
          data.filter(
            (character) =>
              character.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              character.name.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      }
    }
  }

  return (
    <Panel title="Delete Characters">
      <SearchBar
        placeholder="Search for characters"
        handleSearch={handleSearch}
      />
      <TableContainer>
        <TableHeader>
          <th>Character</th>
          <th>Delete</th>
        </TableHeader>
        <TableBody>
          {isPending && (
            <tr>
              <td colSpan={100} className="flex justify-center items-center">
                <LoadingIMG />
              </td>
            </tr>
          )}
          {isError ? (
            <tr>
              <td colSpan={100}>{error.message}</td>
            </tr>
          ) : (
            isSuccess &&
            characters.map((char, i) => {
              return (
                <tr key={i}>
                  <td>{char.id}</td>
                  <td>
                    <button
                      className="rounded-md bg-red-400 p-2"
                      onClick={() => deleteMutation.mutate(char.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              )
            })
          )}
        </TableBody>
      </TableContainer>
    </Panel>
  )
}

function PromoteUserPanel() {
  const { data, isError, isFetching, isSuccess, error } = useUsersQuery()
  const [users, setUsers] = useState<User[]>([])
  const promoteMutation = usePromoteUserMutation()

  useEffect(() => {
    if (data) {
      setUsers(data)
    }
  }, [data])

  const handleSearch = (searchTerm: string) => {
    if (data) {
      if (searchTerm === "") {
        setUsers(data)
      } else {
        setUsers(
          data.filter(
            (user) =>
              user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
              user.email.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      }
    }
  }
  return (
    <Panel title="Promote Users">
      <SearchBar placeholder="Search for users" handleSearch={handleSearch} />
      <TableContainer>
        <TableHeader>
          <th>Username</th>
          <th>Email</th>
          <th></th>
        </TableHeader>
        <TableBody>
          {isError ? (
            <tr>
              <td colSpan={100}>{error.message}</td>
            </tr>
          ) : isFetching ? (
            <tr>
              <td colSpan={100} className="flex justify-center items-center">
                <LoadingIMG />
              </td>
            </tr>
          ) : isSuccess && data.length > 0 ? (
            users.map((user, i) => {
              return (
                <tr key={i}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      className="bg-green-400 p-2 rounded-md"
                      onClick={() => promoteMutation.mutate(user._id)}
                    >
                      Promote
                    </button>
                  </td>
                </tr>
              )
            })
          ) : (
            <tr>
              <td colSpan={100}>No users</td>
            </tr>
          )}
        </TableBody>
      </TableContainer>
    </Panel>
  )
}

function DemoteAdminPanel() {
  const { data, isError, isFetching, isSuccess, error } = useAdminsQuery()
  const demoteMutation = useDemoteAdminMutation()
  const [admins, setAdmins] = useState<User[]>([])

  useEffect(() => {
    if (data) {
      setAdmins(data)
    }
  }, [data])

  const handleSearch = (searchTerm: string) => {
    if (data) {
      if (searchTerm === "") {
        setAdmins(data)
      } else {
        setAdmins(
          data.filter((admin) =>
            admin.username.toLowerCase().includes(searchTerm.toLowerCase())
          )
        )
      }
    }
  }

  return (
    <Panel title="Demote Admins">
      <SearchBar placeholder="Search for admins" handleSearch={handleSearch} />
      <TableContainer>
        <TableHeader>
          <th>Username</th>
          <th>Email</th>
          <th></th>
        </TableHeader>
        <TableBody>
          {isError ? (
            <tr>
              <td colSpan={100}>{error.message}</td>
            </tr>
          ) : isFetching ? (
            <tr>
              <td colSpan={100} className="flex justify-center items-center">
                <LoadingIMG />
              </td>
            </tr>
          ) : isSuccess && data.length > 0 ? (
            admins.map((user, i) => {
              return (
                <tr key={i}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      className="bg-red-400 p-2 rounded-md"
                      onClick={() => demoteMutation.mutate(user._id)}
                    >
                      Demote
                    </button>
                  </td>
                </tr>
              )
            })
          ) : (
            <tr>
              <td colSpan={100}>No users</td>
            </tr>
          )}
        </TableBody>
      </TableContainer>
    </Panel>
  )
}

export default AdminControlPanel
