'use client';

import { useTheme } from 'next-themes';

import { Button } from '@/components/ui/button';

import { LuMoonStar } from 'react-icons/lu';
import { FaSun } from 'react-icons/fa';

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant={'ghost'}
      className="rounded-full bg-muted p-3"
      onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}
    >
      <LuMoonStar className="dark:hidden w-4 h-4" />
      <FaSun className="dark:block hidden w-4 h-4" />
    </Button>
  );
};

export default ThemeToggle;
