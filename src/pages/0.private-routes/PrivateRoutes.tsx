import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Navbar } from '../../components/header/Navbar'

export default function PrivateRoutes() {
  const { currentUser, currentUserDatabase } = useAuth()

  console.log(currentUser || currentUserDatabase)

  return (currentUser || currentUserDatabase) ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/" />
  )
}
