'use client'

import { useEffect } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'

export default function Home() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push('/dashboard')
      } else {
        router.push('/auth')
      }
    }
  }, [user, loading, router])

  // 로딩 중일 때 표시할 화면
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full overflow-hidden">
          <img src="/kevin.png" alt="Kevin" className="w-full h-full object-cover" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
          DLAB Kevin&apos;s Page
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-4">
          잠시만 기다려주세요...
        </p>
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
      </div>
    </div>
  )
}
