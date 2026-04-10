import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

function NotFound() {
  const navigate = useNavigate()

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/')
    }, 3000)

    return () => clearTimeout(timer)
  }, [navigate])

  return (
    <div className="text-center py-5">
      <h1>404 - Page Not Found</h1>
      <p>Redirecting you to Home...</p>
    </div>
  )
}

export default NotFound