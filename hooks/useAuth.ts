import { useState, useEffect, useCallback } from 'react'
import useSWR from 'swr'

export interface User {
  id: string
  email: string
  name: string
  verified: boolean
}

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Failed to fetch')
  }
  return res.json()
}

export function useAuth() {
  const { data, error, isLoading, mutate } = useSWR(
    '/api/auth/me',
    fetcher,
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      dedupingInterval: 60000, // 1 minute
    }
  )

  const user: User | null = data?.user || null
  const isAuthenticated = !!user && user.verified

  const logout = useCallback(async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      await mutate(null, false)
      window.location.href = '/'
    } catch (error) {
      console.error('Logout failed:', error)
    }
  }, [mutate])

  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    logout,
    mutate,
  }
}
