import React from 'react';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";

type NavItem = 'about' | 'projects' | 'skills' | 'contact';

interface ResponsiveNavigationProps {
  activeTab: NavItem;
  scrollToSection: (section: NavItem) => void;
}

const ResponsiveNavigation: React.FC<ResponsiveNavigationProps> = ({ activeTab, scrollToSection }) => {
  const navItems: NavItem[] = ['about', 'projects', 'skills', 'contact'];

  return (
    <div className="ml-auto flex items-center">
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="block md:hidden">
            <Menu className="h-6 w-6" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="right" className="w-[200px] sm:w-[300px]">
          <nav className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Button
                key={item}
                variant="ghost"
                className={`justify-start text-sm font-medium ${activeTab === item ? 'text-primary' : 'text-muted-foreground'}`}
                onClick={() => scrollToSection(item)}
              >
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </Button>
            ))}
          </nav>
        </SheetContent>
      </Sheet>
      <nav className="hidden md:flex space-x-4">
        {navItems.map((item) => (
          <Button
            key={item}
            variant="ghost"
            className={`text-sm font-medium ${activeTab === item ? 'text-primary' : 'text-muted-foreground'}`}
            onClick={() => scrollToSection(item)}
          >
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </Button>
        ))}
      </nav>
    </div>
  );
};

export default ResponsiveNavigation;