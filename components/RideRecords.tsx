import React from "react";
import { cn } from "@/lib/utils";
import guy from "@/avatar/guy.jpg"
import { FaArrowRight } from "react-icons/fa";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

const rides = [
  {
    from: "Warszawa",
    to:"Gdańsk",
    car: "Honda Accord",
    price: "100 zł",
    user: "Ryszard",
    picture: guy.src
  },
  {
    from: "Gdynia",
    to:"Poznań",
    car: "Ford Focus",
    price: "140 zł",
    user: "Maciek",
    picture: guy.src
  }
];

type CardProps = React.ComponentProps<typeof Card>;

export function CardDemo({ className, ...props }: CardProps) {
  return (
  <div>{rides.map((ride, index) => (
    <div key={index}>
    <Card className={cn("w-[1090px] mx-auto my-auto mt-8")} {...props}>
      <CardHeader>
        <div className="flex justify-between">
          <div>
            <CardTitle className="flex gap-2">{ride.from} <FaArrowRight /> {ride.to}</CardTitle>
            <CardDescription className="mt-2">{ride.car}</CardDescription>
          </div>
          <CardTitle className="flex justify-center items-right">{ride.price}</CardTitle>
        </div>
      </CardHeader>
      <div className="flex items-left ml-6">
        <Image src={ride.picture} className="rounded-full w-9 h-9"  alt="User Avatar" width={35} height={35}/> 
        <CardContent className="flex items-right mt-1">{ride.user}</CardContent>
      </div>
    </Card>
    </div>
  ))}
  </div>
  );
}

export default CardDemo;
