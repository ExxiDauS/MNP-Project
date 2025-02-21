'use client'

import React, { useState } from 'react';
import { MapPinHouseIcon, Search } from 'lucide-react';
import { Command, CommandInput, CommandList, CommandGroup, CommandItem } from '@/components/ui/command';
import { Button } from '@/components/ui/button';

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const suggestions = [
    { icon: MapPinHouseIcon, label: 'Ban Puen', shortcut: null },
    { icon: MapPinHouseIcon, label: 'Shimokitazawa Shelter', shortcut: null },
    { icon: MapPinHouseIcon, label: `Sangenjaya Heaven's Door`, shortcut: null }
  ];

  return (
    <div className="relative">
      <Button 
        variant="ghost" 
        size="icon" 
        className="hover:bg-zinc-800 rounded-full size-11"
        onClick={() => setIsOpen(true)}
      >
        <Search className="h-5 w-5 text-white" />
      </Button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="absolute top-1 left-full w-80">
            <Command className="rounded-lg border shadow-md bg-black">
              <CommandInput
                placeholder="ค้นหา..."
                onFocus={() => setIsOpen(true)}
                className="text-sm text-white"
                autoFocus
              />
              <CommandList className="px-2">
                <CommandGroup heading="Suggestions" className="text-gray-400">
                  {suggestions.map((item) => (
                    <CommandItem
                      key={item.label}
                      className="flex items-center space-x-2 px-2 py-2 text-sm text-gray-300 hover:bg-white hover:text-black rounded-md cursor-pointer transition-colors duration-200"
                    >
                      <item.icon className="h-4 w-4" />
                      <span>{item.label}</span>
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </div>
        </>
      )}
    </div>
  );
};

export default SearchBar;
