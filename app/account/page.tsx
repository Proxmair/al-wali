'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Loader2 } from 'lucide-react'

export default function AccountPage() {
  const router = useRouter()
  const { user, isAuthenticated, isLoading, logout } = useAuth()

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/auth/login')
    }
  }, [isAuthenticated, isLoading, router])

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (!isAuthenticated || !user) {
    return null
  }

  return (
    <div className="min-h-screen bg-background py-12">
      <div className="container max-w-2xl">
        <div className="space-y-8">
          {/* Profile Card */}
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">My Account</CardTitle>
              <CardDescription>Manage your account information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <label className="text-sm font-medium text-muted-foreground">Full Name</label>
                <p className="text-lg font-semibold mt-1">{user.name}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Email Address</label>
                <p className="text-lg font-semibold mt-1">{user.email}</p>
              </div>

              <div>
                <label className="text-sm font-medium text-muted-foreground">Account Status</label>
                <p className="text-lg font-semibold mt-1">
                  {user.verified ? (
                    <span className="text-green-600">Verified</span>
                  ) : (
                    <span className="text-yellow-600">Pending Verification</span>
                  )}
                </p>
              </div>

              <Button variant="outline" className="w-full">
                Edit Profile
              </Button>
            </CardContent>
          </Card>

          {/* Settings Card */}
          <Card>
            <CardHeader>
              <CardTitle>Settings</CardTitle>
              <CardDescription>Manage your preferences</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button variant="outline" className="w-full">
                Change Password
              </Button>
              <Button variant="outline" className="w-full">
                Email Preferences
              </Button>
              <Button variant="outline" className="w-full">
                Privacy Settings
              </Button>
            </CardContent>
          </Card>

          {/* Logout */}
          <div>
            <Button
              variant="destructive"
              className="w-full"
              onClick={logout}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
