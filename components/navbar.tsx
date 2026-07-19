'use client'

import { useState } from 'react'
import { ShoppingCart, Heart, User,Lock, Search, Menu, X } from 'lucide-react'
import Logo from '@/public/main-logo.png'
import Image from 'next/image'
import { scrollToSection } from '@/lib/utils'


import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
import { AuthModal } from './modals/AuthModal'
import { UserModal } from './modals/UserModal';


interface IconButtonProps {
  count?: number;
  tooltip: string;
  children: React.ReactNode;
}

function IconButton({ count, tooltip, children }: IconButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div className="relative inline-flex p-2 hover:bg-muted rounded-full transition-colors">
          {children}
          {count && count > 0 && (
            <span className="absolute -top-1 -right-1 bg-amber-800 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full font-semibold">
              {count > 99 ? '99+' : count}
            </span>
          )}
        </div>
      </TooltipTrigger>
      <TooltipContent side="top">{tooltip}</TooltipContent>
    </Tooltip>
  );
}

function IconButtons() {

  const favouriteCount = useSelector((state: RootState) => state.counter.favourite.count);
  const cartCount = useSelector((state: RootState) => state?.counter?.cart?.count);
  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  const [isOpen, setIsOpen] = useState(false);
  const [userModalOpen, setUserModalOpen] = useState(false);

  const handleAuthModalOpen = () => {
    if (!isLoggedIn)
    {
      setIsOpen(true);
    }
    else {
      setUserModalOpen(true);
    }
  }
  
  return (
    <div className="flex items-center space-x-2">
      <IconButton count={favouriteCount || undefined} tooltip="Favourite">
        <Heart className="w-5 h-5 text-foreground" />
      </IconButton>

      <IconButton count={cartCount || undefined} tooltip="Cart">
        <ShoppingCart className="w-5 h-5 text-foreground" />
      </IconButton>

      <IconButton tooltip={isLoggedIn ? "My Account" : "Login"}>
        <div onClick={handleAuthModalOpen}>
          {isLoggedIn ? (
            <User className="w-5 h-5 text-foreground" />
          ) : (
            <Lock className="w-5 h-5 text-foreground" />
          )}
        </div>
      </IconButton>
      <AuthModal open={isOpen} onOpenChange={setIsOpen} defaultTab="login" />
      <UserModal
        open={userModalOpen}
        onOpenChange={setUserModalOpen}
      />
    </div>
  );
}


export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border shadow-sm">
      <div className="mx-auto px-1 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center sm:h-40 h-24">
          {/* Logo */}
          <div onClick={() => scrollToSection('hero')} className="shrink-0">
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
            <a onClick={() => scrollToSection('collection')} className="text-foreground hover:text-primary transition-colors text-sm font-medium hover:cursor-pointer">
              Collection
            </a>
            <a onClick={() => scrollToSection('deals')} className="text-foreground hover:text-primary transition-colors text-sm font-medium hover:cursor-pointer">
              Deals
            </a>
            <a onClick={() => scrollToSection('contact')} className="text-foreground hover:text-primary transition-colors text-sm font-medium hover:cursor-pointer">
              Contact Us
            </a>
          </div>

          {/* Search Bar - Desktop Only */}
          <div className="hidden lg:flex items-center bg-muted rounded-full px-4 py-2 gap-2 flex-1 mx-8">
            <Search className="w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search attars..."
              className="bg-transparent outline-none w-full text-sm placeholder-muted-foreground"
            />
          </div>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <IconButtons />

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
            <a onClick={() => { scrollToSection('collection'); setIsOpen(!isOpen) }} className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg">
              Collection
            </a>
            <a onClick={() => { scrollToSection('deals'); setIsOpen(!isOpen) }} className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg">
              Deals
            </a>
            <a onClick={() => { scrollToSection('contact'); setIsOpen(!isOpen) }} className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg">
              Contact Us
            </a>
            <a href="#" className="block px-4 py-2 text-foreground hover:bg-muted rounded-lg">
              Account
            </a>
          </div>
        )}
      </div>
    </nav>
  )
}
