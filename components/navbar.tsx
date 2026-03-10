'use client'

import { useState } from 'react'
import { ShoppingCart, Heart, User, Search, Menu, X, LogOut } from 'lucide-react'
import Logo from '@/public/main-logo.png'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { user, isAuthenticated, logout, isLoading } = useAuth()

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="mx-auto px-1 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center sm:h-40 h-24">
          {/* Logo */}
          <div className="shrink-0">
            <Image
              src={Logo}
              alt="AL Wali"
              width={40}
              height={40}
              className="md:h-32 h-18 w-auto"
            />
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-foreground hover:text-primary transition-colors text-sm font-medium">
              Collection
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors text-sm font-medium">
              About Us
            </a>
            <a href="#" className="text-foreground hover:text-primary transition-colors text-sm font-medium">
              Contact Us
            </a>
          </div>

          {/* Search Bar - Desktop Only */}
          <div className="hidden lg:flex items-center bg-muted rounded-full px-4 py-2 gap-2 flex-1 mx-8">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search fragrances..."
              className="bg-transparent outline-none w-full text-sm placeholder-muted-foreground"
            />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <button className="hidden lg:inline-flex p-2 hover:bg-muted rounded-full transition-colors">
              <Heart className="w-5 h-5 text-foreground" />
            </button>
            <button className="p-2 hover:bg-muted rounded-full transition-colors relative">
              <ShoppingCart className="w-5 h-5 text-foreground" />
              <span className="absolute top-1 right-1 bg-primary text-primary-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                0
              </span>
            </button>

            {/* Auth Actions */}
            {isLoading ? (
              <div className="hidden lg:flex h-10 w-10 rounded-full bg-muted animate-pulse" />
            ) : isAuthenticated && user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="hidden lg:inline-flex p-2 hover:bg-muted rounded-full transition-colors">
                    <User className="w-5 h-5 text-foreground" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <div className="px-2 py-1.5 text-sm">
                    <p className="font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.email}</p>
                  </div>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/account">My Account</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/orders">My Orders</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="text-red-600">
                    <LogOut className="mr-2 h-4 w-4" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden lg:flex gap-2">
                <Link href="/auth/login">
                  <Button variant="ghost" size="sm">
                    Sign In
                  </Button>
                </Link>
                <Link href="/auth/signup">
                  <Button size="sm">
                    Sign Up
                  </Button>
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-muted rounded-full"
            >
              {isOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <div className="flex items-center bg-muted rounded-full px-4 py-2 gap-2 mb-4">
              <Search className="w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent outline-none w-full text-sm"
              />
            </div>
            <a href="#" className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg">
              Collection
            </a>
            <a href="#" className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg">
              About Us
            </a>
            <a href="#" className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg">
              Contact Us
            </a>
            
            {isAuthenticated && user ? (
              <>
                <a href="/account" className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg">
                  My Account
                </a>
                <a href="/orders" className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg">
                  My Orders
                </a>
                <button
                  onClick={logout}
                  className="block w-full text-left px-4 py-2 text-foreground hover:bg-muted rounded-lg text-red-600"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link href="/auth/login" className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg">
                  Sign In
                </Link>
                <Link href="/auth/signup" className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg font-medium">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  )
}
