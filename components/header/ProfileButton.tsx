'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { ClerkLoaded, ClerkLoading } from '@clerk/nextjs';
import { useClerk, useUser } from '@clerk/clerk-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Skeleton } from '@/components/ui/skeleton';

import { FaChevronDown } from 'react-icons/fa';

/**
 * Profile button component used in header.
 * If a user is authenticated, it displays the user's profile information and a dropdown menu with account options.
 * If a user is not authenticated, it displays a loading state and a sign-in link.
 */
const ProfileButton = () => {
  const { user } = useUser();
  const { signOut } = useClerk();

  const router = useRouter();

  return user ? (
    <DropdownMenu>
      <DropdownMenuTrigger className="flex items-center gap-2">
        <Avatar className="w-[30px] h-[30px]">
          <AvatarImage src={user?.imageUrl} />
          <AvatarFallback>
            {user.firstName![-1]}
            {user.lastName![-1]}
          </AvatarFallback>
        </Avatar>
        <p className="text-sm font-semibold">
          {user.firstName} {user.lastName}
        </p>
        <FaChevronDown />
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Profile</DropdownMenuItem>
        <DropdownMenuItem asChild className="hover:cursor-pointer">
          <Link href={'/settings'}>Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => signOut(() => router.push('/'))}
          className="hover:cursor-pointer"
        >
          Sign Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  ) : (
    <>
      <ClerkLoading>
        <div className="flex items-center justify-center gap-2">
          <Skeleton className="w-[30px] h-[30px] rounded-full" />
          <Skeleton className="w-[135px] h-[20px] rounded-full" />
        </div>
      </ClerkLoading>
      <ClerkLoaded>
        <Link href={'/auth/login'} className="flex items-center gap-2">
          <Avatar className="w-[30px] h-[30px]">
            <AvatarImage src="avatar.webp" />
          </Avatar>
          <p className="text-sm font-semibold">Sign in</p>
        </Link>
      </ClerkLoaded>
    </>
  );
};

export default ProfileButton;
