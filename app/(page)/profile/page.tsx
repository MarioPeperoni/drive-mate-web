"use client";

import { useUser } from "@clerk/nextjs";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import RidesAsDriverCard from "@/components/profile/RidesAsDriverCard";
import RidesAsPassagerCard from "@/components/profile/RidesAsPassagerCard";

const ProfilePage = () => {
  const user = useUser();

  if (!user.isLoaded) {
    return null;
  }

  return (
    <>
      <Card className="mx-auto mt-28 w-[95%] sm:w-[90%]">
        <CardHeader className="flex -translate-y-28 items-center justify-center">
          <Avatar className="h-48 w-48">
            <AvatarImage src={user.user?.imageUrl} />
            <AvatarFallback>
              {user.user?.firstName?.charAt(0)}
              {user.user?.lastName?.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <CardTitle className=" text-3xl">{user.user?.username}</CardTitle>
          <CardDescription>{user.user?.fullName}</CardDescription>
        </CardHeader>
        <CardContent className="-mt-28 space-y-2">
          <RidesAsDriverCard userId={user.user!.id} />
          <RidesAsPassagerCard userId={user.user!.id} />
        </CardContent>
      </Card>
    </>
  );
};

export default ProfilePage;
