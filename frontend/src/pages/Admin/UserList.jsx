import { useEffect, useState } from "react"
import { FaCheck, FaEdit, FaTimes, FaTrash } from "react-icons/fa"
import { toast } from "react-toastify"
import Loader from "../../components/Loader"
import Message from "../../components/Message"
import {
  useDeleteUserMutation,
  useGetUsersQuery,
  useUpdateUserMutation,
} from "../../redux/api/usersApiSlice"

const UserList = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery()
  const [deleteUser] = useDeleteUserMutation()
  const [updateUser] = useUpdateUserMutation()

  const [editUserId, setEditUserId] = useState(null)
  const [editUsername, setEditUsername] = useState('')
  const [editUserEmail, setEditUserEmail] = useState('')

  useEffect(() => {
    refetch()
  }, [refetch]);

  const toggleEdit = (userId, username, email) => {
    setEditUserId(userId)
    setEditUsername(username)
    setEditUserEmail(email)
  }

  const updateHandler = async (userId) => {
    try {
      await updateUser({ id: userId, username: editUsername, email: editUserEmail })
      setEditUserId(null)
      setEditUsername('')
      setEditUserEmail('')
      refetch()
    } catch (error) {
      toast.error(error?.data?.message || error?.message || 'An error occurred')
    }
  }

  const deleteHandler = async (userId) => {
    if (window.confirm('Are You Sure?')) {
      try {
        await deleteUser(userId)
        refetch()
      } catch (error) {
        toast.error(error?.data?.message || error?.message || 'An error occurred')
      }
    }
  }

  return (
    <div className="p-4 bg-black text-white">
      <h1 className="text-2xl font-semibold mb-4">Users</h1>
      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error?.data?.message || error?.message || 'Error fetching users'}</Message>
      ) : (
        <div className="flex flex-col md:flex-row">
          <table className="w-full md:w-4/5 mx-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">ID</th>
                <th className="px-4 py-2 text-left">NAME</th>
                <th className="px-4 py-2 text-left">EMAIL</th>
                <th className="px-4 py-2 text-left">ADMIN</th>
                <th className="px-4 py-2 text-left">ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {users.map(user => (
                <tr key={user._id}>
                  <td className="px-4 py-2">{user._id}</td>
                  <td className="px-4 py-2">
                    {editUserId === user._id ? (
                      <div className="flex items-center">
                        <input type="text" value={editUsername} onChange={e => setEditUsername(e.target.value)} className="w-full p-2 border text-black rounded-lg" />
                        <button onClick={() => updateHandler(user._id)} className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg">
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        {user.username} {" "}
                        <button onClick={() => toggleEdit(user._id, user.username, user.email)}>
                          <FaEdit className="ml-[1rem]" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {editUserId === user._id ? (
                      <div className="flex items-center">
                        <input type="text" value={editUserEmail} onChange={e => setEditUserEmail(e.target.value)} className="w-full p-2 border  text-black  rounded-lg" />
                        <button onClick={() => updateHandler(user._id)} className="ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg">
                          <FaCheck />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center">
                        {user.email} {" "}
                        <button onClick={() => toggleEdit(user._id, user.username, user.email)}>
                          <FaEdit className="ml-[1rem]" />
                        </button>
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {user.isAdmin ? (
                      <FaCheck style={{ color: "green" }} />
                    ) : (
                      <FaTimes style={{ color: "red" }} />
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {!user.isAdmin && (
                      <button onClick={() => deleteHandler(user._id)}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4"
                      ><FaTrash /></button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}

export default UserList
