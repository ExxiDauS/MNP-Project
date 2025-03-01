import React from 'react'

const NavLink = ({ children }: { children: string }) => {
  return (
    <div className="group inline-flex h-9 w-max items-center justify-center rounded-md 
    bg-transparent px-4 py-2 text-sm font-medium transition-colors
     hover:bg-zinc-800 hover:text-zinc-50 focus:bg-zinc-800 focus:text-zinc-50 focus:outline-none disabled:opacity-50 
     text-zinc-100 cursor-pointer">
      {children}
    </div>
  )
}

export default NavLink