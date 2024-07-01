import { useMutation, useQueryClient } from 'react-query'
import * as apiClient from '../api/auth'
import { toast } from 'react-toastify'
import { useAppContext } from '../contexts/AppContext'
import { useNavigate } from 'react-router-dom'

const SignOutButton = () => {
    const navigate = useNavigate()
    const { setIsLoggedIn } = useAppContext()
    const queryClient = useQueryClient()
    const mutation = useMutation(apiClient.signOut, {
        onSuccess: async () => {
            setIsLoggedIn(false)
            await queryClient.invalidateQueries('verifyToken')
            toast.success('Signed out!')
            navigate("/")
        },
        onError: (error: Error) => {
            toast.error(error.message)
        },
    })

    const handleClick = () => {
        mutation.mutate()
    }

    return (
        <button onClick={handleClick} className="text-gray-600 px-3 py-2 font-bold bg-white hover:bg-gray-300 rounded-lg border border-black">
            Sign Out
        </button>
    )
}

export default SignOutButton
