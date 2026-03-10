'use client'

import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useState } from 'react'

interface GoogleAuthButtonProps {
  mode: 'signin' | 'signup'
}

export default function GoogleAuthButton({ mode }: GoogleAuthButtonProps) {
  const [loading, setLoading] = useState(false)

  const handleGoogleAuth = async () => {
    try {
      setLoading(true)
      
      // Get Google OAuth URL
      const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID
      const redirectUri = `${window.location.origin}/api/auth/google/callback`
      const scope = 'openid profile email'
      const responseType = 'code'

      if (!clientId) {
        alert('Google OAuth not configured. Please set NEXT_PUBLIC_GOOGLE_CLIENT_ID.')
        return
      }

      const authUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth')
      authUrl.searchParams.set('client_id', clientId)
      authUrl.searchParams.set('redirect_uri', redirectUri)
      authUrl.searchParams.set('response_type', responseType)
      authUrl.searchParams.set('scope', scope)

      window.location.href = authUrl.toString()
    } catch (error) {
      console.error('Google auth error:', error)
      alert('Failed to initiate Google sign-in')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Button
      variant="outline"
      className="w-full"
      onClick={handleGoogleAuth}
      disabled={loading}
    >
      {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {mode === 'signin' ? 'Sign in with Google' : 'Sign up with Google'}
    </Button>
  )
}
