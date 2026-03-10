'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { InputOTP } from '@/components/ui/input-otp'
import { Loader2, ArrowLeft } from 'lucide-react'
import { toast } from 'sonner'
import GoogleAuthButton from '@/components/GoogleAuthButton'

export default function SignUpPage() {
  const router = useRouter()
  const [step, setStep] = useState<'info' | 'verify'>('info')
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [otp, setOtp] = useState('')
  const [timer, setTimer] = useState(0)

  // OTP Timer
  useEffect(() => {
    if (timer > 0) {
      const interval = setTimeout(() => setTimer(timer - 1), 1000)
      return () => clearTimeout(interval)
    }
  }, [timer])

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!email || !name) {
      toast.error('Please fill in all fields')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      })

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.error || 'Signup failed')
        return
      }

      toast.success('OTP sent to your email')
      setStep('verify')
      setTimer(600) // 10 minutes
    } catch (error) {
      toast.error('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyOTP = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!otp || otp.length !== 6) {
      toast.error('Please enter a valid 6-digit code')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code: otp }),
      })

      const data = await response.json()

      if (!response.ok) {
        toast.error(data.error || 'Verification failed')
        return
      }

      toast.success('Account created successfully!')
      router.push('/')
    } catch (error) {
      toast.error('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleResendOTP = async () => {
    if (timer > 0) return

    setLoading(true)
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, name }),
      })

      if (!response.ok) {
        toast.error('Failed to resend OTP')
        return
      }

      toast.success('OTP resent to your email')
      setTimer(600)
    } catch (error) {
      toast.error('An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        {step === 'info' ? (
          <>
            <CardHeader className="text-center">
              <CardTitle className="text-2xl">Create Account</CardTitle>
              <CardDescription>Join AL Wali and discover premium fragrances</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSignUp} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                  />
                </div>
                <Button type="submit" className="w-full" disabled={loading}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Continue
                </Button>
              </form>

              <div className="mt-6 flex items-center gap-3">
                <div className="h-px flex-1 bg-border" />
                <span className="text-sm text-muted-foreground">or</span>
                <div className="h-px flex-1 bg-border" />
              </div>

              <div className="mt-4">
                <GoogleAuthButton mode="signup" />
              </div>

              <p className="text-center text-sm mt-4">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-primary hover:underline font-medium">
                  Sign in
                </Link>
              </p>
            </CardContent>
          </>
        ) : (
          <>
            <CardHeader>
              <button
                onClick={() => {
                  setStep('info')
                  setOtp('')
                }}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-4"
              >
                <ArrowLeft className="w-4 h-4" />
                Back
              </button>
              <CardTitle className="text-2xl">Verify Email</CardTitle>
              <CardDescription>Enter the 6-digit code sent to {email}</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleVerifyOTP} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="otp">Verification Code</Label>
                  <InputOTP
                    maxLength={6}
                    value={otp}
                    onChange={setOtp}
                    disabled={loading}
                    render={({ slots }) => (
                      <div className="flex gap-2 justify-center">
                        {slots.map((slot, idx) => (
                          <div key={idx} className="w-12 h-14">
                            <input
                              {...slot}
                              type="text"
                              inputMode="numeric"
                              className="w-full h-full text-center text-2xl font-semibold border border-input rounded-lg bg-background focus:outline-none focus:border-primary"
                            />
                          </div>
                        ))}
                      </div>
                    )}
                  />
                </div>

                <Button type="submit" className="w-full" disabled={loading || otp.length !== 6}>
                  {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Verify & Create Account
                </Button>
              </form>

              <div className="mt-6 text-center">
                {timer > 0 ? (
                  <p className="text-sm text-muted-foreground">
                    Resend code in {Math.floor(timer / 60)}:{String(timer % 60).padStart(2, '0')}
                  </p>
                ) : (
                  <button
                    onClick={handleResendOTP}
                    disabled={loading || timer > 0}
                    className="text-sm text-primary hover:underline font-medium"
                  >
                    Resend Code
                  </button>
                )}
              </div>
            </CardContent>
          </>
        )}
      </Card>
    </div>
  )
}
