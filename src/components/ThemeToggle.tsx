'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  const handleToggle = () => {
    console.log('테마 전환 클릭:', theme)
    toggleTheme()
  }

  return (
    <button
      onClick={handleToggle}
      className="relative p-2 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      aria-label={`테마 전환 - 현재 ${theme === 'light' ? '라이트' : '다크'} 모드`}
      type="button"
    >
      <div className="relative w-6 h-6">
        <Sun 
          className={`absolute inset-0 w-6 h-6 text-yellow-500 transition-all duration-300 ${
            theme === 'light' ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'
          }`}
        />
        <Moon 
          className={`absolute inset-0 w-6 h-6 text-blue-500 transition-all duration-300 ${
            theme === 'dark' ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
          }`}
        />
      </div>
    </button>
  )
} 