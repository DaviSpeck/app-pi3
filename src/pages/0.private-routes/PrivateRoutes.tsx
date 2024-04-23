import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { Navbar } from '../../components/header/Navbar'

export default function PrivateRoutes() {
  const { currentUser } = useAuth()

  return currentUser ? (
    <>
      <Navbar />
      <Outlet />
    </>
  ) : (
    <Navigate to="/" />
  )
}
