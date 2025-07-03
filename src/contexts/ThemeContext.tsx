'use client'

import { createContext, useContext, useEffect, useState } from 'react'

type Theme = 'light' | 'dark'

interface ThemeContextType {
  theme: Theme
  toggleTheme: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>('light')
  const [mounted, setMounted] = useState(false)

  // 초기 테마 설정
  useEffect(() => {
    setMounted(true)
    
    try {
      // 로컬 스토리지에서 테마 설정 불러오기
      const savedTheme = localStorage.getItem('theme') as Theme
      if (savedTheme && (savedTheme === 'light' || savedTheme === 'dark')) {
        console.log('저장된 테마 불러오기:', savedTheme)
        setTheme(savedTheme)
      } else {
        // 시스템 테마 설정 확인
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        console.log('시스템 테마 감지:', systemTheme)
        setTheme(systemTheme)
      }
    } catch (error) {
      console.error('테마 초기화 오류:', error)
    }
  }, [])

  // 테마 적용
  useEffect(() => {
    if (!mounted) return
    
    try {
      // HTML 요소에 테마 클래스 적용
      const root = document.documentElement
      root.classList.remove('light', 'dark')
      root.classList.add(theme)
      
      // 로컬 스토리지에 테마 저장
      localStorage.setItem('theme', theme)
      console.log('테마 적용 완료:', theme, 'HTML 클래스:', root.className)
    } catch (error) {
      console.error('테마 적용 오류:', error)
    }
  }, [theme, mounted])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    console.log('테마 토글 시작:', theme, '->', newTheme)
    setTheme(newTheme)
  }

  const value: ThemeContextType = {
    theme,
    toggleTheme,
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
} 