import Link from 'next/link';

import { Button } from '@/components/ui/button';

import ProfileButton from '@/components/header/ProfileButton';
import ThemeToggle from '@/components/header/ThemeToggle';

/**
 * The main header component.
 */
const Header = () => {
  return (
    <div className="h-14 w-full flex items-center justify-between px-7 shadow-lg">
      <Link className="text-xl font-semibold" href={'/'}>
        Drive Mate
      </Link>
      <div className="flex gap-5">
        <ThemeToggle />
        <ProfileButton />
        <Button>Share your ride</Button>
      </div>
    </div>
  );
};

export default Header;
