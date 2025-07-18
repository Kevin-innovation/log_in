'use client'

import { useAuth } from '@/contexts/AuthContext'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

import { LogOut, Gamepad2, Trophy, Star, Settings } from 'lucide-react'

export default function DashboardPage() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/auth')
    }
  }, [user, loading, router])

  const handleSignOut = async () => {
    await signOut()
    router.push('/auth')
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100   flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 ">로딩 중...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  const games = [
    {
      id: 1,
      title: 'Wave 게임',
      description: '파도를 타며 높은 점수를 달성해보세요',
      icon: <Trophy className="w-8 h-8" />,
      color: 'from-yellow-400 to-orange-500',
      status: 'coming-soon'
    },
    {
      id: 2,
      title: '메모리 게임',
      description: '기억력을 테스트해보세요',
      icon: <Star className="w-8 h-8" />,
      color: 'from-purple-400 to-pink-500',
      status: 'coming-soon'
    },
    {
      id: 3,
      title: '워드 퍼즐',
      description: '단어를 맞춰보는 게임',
      icon: <Gamepad2 className="w-8 h-8" />,
      color: 'from-green-400 to-blue-500',
      status: 'coming-soon'
    },
    {
      id: 4,
      title: '수학 게임',
      description: '계산 실력을 향상시켜보세요',
      icon: <Settings className="w-8 h-8" />,
      color: 'from-red-400 to-purple-500',
      status: 'coming-soon'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100  ">
      {/* 헤더 */}
      <header className="bg-white  shadow-sm border-b border-gray-200 ">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-white border-2 border-gray-200">
                <img src="/kevin.png" alt="Kevin" className="w-full h-full object-cover" />
              </div>
              <h1 className="ml-3 text-xl font-bold text-gray-900 ">
                DLAB Kevin&apos;s Page
              </h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600 ">
                안녕하세요, {user.email}님!
              </span>

              <button
                onClick={handleSignOut}
                className="flex items-center space-x-2 text-gray-600  hover:text-gray-900 :text-white transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>로그아웃</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* 메인 콘텐츠 */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900  mb-4">
            게임을 선택하세요
          </h2>
          <p className="text-lg text-gray-600 ">
            다양한 게임을 통해 재미있는 시간을 보내보세요
          </p>
        </div>

        {/* 게임 그리드 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
          {games.map((game) => (
            <div
              key={game.id}
              className="bg-white  rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-6 border border-gray-200 "
            >
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg bg-gradient-to-r ${game.color} text-white`}>
                  {game.icon}
                </div>
                {game.status === 'coming-soon' && (
                  <span className="bg-yellow-100 text-yellow-800 text-xs font-medium px-2.5 py-0.5 rounded-full  ">
                    Coming Soon
                  </span>
                )}
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900  mb-2">
                {game.title}
              </h3>
              
              <p className="text-gray-600  mb-4">
                {game.description}
              </p>
              
              <button
                disabled={game.status === 'coming-soon'}
                className={`w-full py-2 px-4 rounded-lg font-medium transition-all ${
                  game.status === 'coming-soon'
                    ? 'bg-gray-200 text-gray-400 cursor-not-allowed  '
                    : 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
                }`}
              >
                {game.status === 'coming-soon' ? '준비 중' : '게임 시작'}
              </button>
            </div>
          ))}
        </div>

        {/* 추가 정보 */}
        <div className="mt-16 text-center">
          <div className="bg-white  rounded-xl shadow-lg p-8 border border-gray-200 ">
            <h3 className="text-2xl font-bold text-gray-900  mb-4">
              더 많은 게임이 준비 중입니다!
            </h3>
            <p className="text-gray-600  mb-6">
              곧 다양한 게임들을 만나보실 수 있습니다. 업데이트를 기대해주세요!
            </p>
            <div className="flex justify-center space-x-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 ">4</div>
                <div className="text-sm text-gray-600 ">개발 중인 게임</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 ">∞</div>
                <div className="text-sm text-gray-600 ">무한한 재미</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 ">24/7</div>
                <div className="text-sm text-gray-600 ">언제든지 플레이</div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
} 