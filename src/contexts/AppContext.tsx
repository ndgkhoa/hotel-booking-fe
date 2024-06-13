import { createContext, ReactNode, useContext } from 'react'
import { useQuery } from 'react-query'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import * as apiClient from '../api/auth'

type AppContextType = {
    isLoggedIn: boolean
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export const useAppContext = () => {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error('useAppContext must be used within an AppContextProvider')
    }
    return context
}

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
    const { isError } = useQuery('validateToken', apiClient.validateToken, {
        retry: false,
    })
    return (
        <AppContext.Provider value={{ isLoggedIn: !isError }}>
            {children}
            <ToastContainer />
        </AppContext.Provider>
    )
}
