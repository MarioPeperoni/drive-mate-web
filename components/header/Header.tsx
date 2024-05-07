"use client";

import Link from "next/link";
import axios from "axios";
import { useAuth } from "@clerk/nextjs";

import { Button } from "@/components/ui/button";

import ProfileButton from "@/components/header/ProfileButton";
import ThemeToggle from "@/components/header/ThemeToggle";

/**
 * The main header component.
 */
const Header = () => {
  const { getToken } = useAuth();
  const handleClick = async () => {
    const token = await getToken();
    const response = await axios
      .put("https://localhost:57407/api/rides/2", "", {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => console.log(res));
  };
  return (
    <div className="flex h-14 w-full items-center justify-between px-7 shadow-lg">
      <Link className="text-xl font-semibold" href={"/"}>
        Drive Mate
      </Link>
      <div className="flex gap-5">
        <ThemeToggle />
        <ProfileButton />
        <Link href={'/create'}><Button onClick={() => handleClick()} >Share your ride</Button></Link>
        
      </div>
    </div>
  );
};

export default Header;
