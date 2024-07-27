'use client'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

const ProtectedRoute = ({ children }) => {
  const { data: session, status } = useSession()
  const router = useRouter()

  useEffect(() => {
    if (status === 'loading') return // Do nothing while loading
    if (!session) router.push('/login')
  }, [session, status, router])

  if (status === 'loading') {
    return <div>Loading...</div>
  }

  return session ? children : null
}

export default ProtectedRoute