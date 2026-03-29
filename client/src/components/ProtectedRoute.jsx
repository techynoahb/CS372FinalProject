import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function ProtectedRoute({ children, requiredRole }) {
  const { user } = useAuth()

  if (!user || user.role !== requiredRole) {
    return <Navigate to="/login" />
  }

  return children
}

export default ProtectedRoute