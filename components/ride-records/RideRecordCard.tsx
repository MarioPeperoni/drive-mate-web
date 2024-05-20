"use client";

import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";

import { Card, CardTitle, CardContent } from "@/components/ui/card";

import { HiArrowRight } from "react-icons/hi";
import { FaLocationPinLock } from "react-icons/fa6";

interface RideRecordCardProps {
  ride: Ride;
}

const RideRecordCard = ({ ride }: RideRecordCardProps) => {
  return (
    <Card
      className={
        "mx-auto my-auto w-[95%] transition hover:cursor-pointer hover:shadow-lg sm:w-[80%]"
      }
    >
      <Link href={`/ride/${ride.id}`}>
        <CardContent className="flex flex-col justify-between p-4 pb-4 sm:flex-row">
          <div>
            <CardTitle className="flex items-center space-x-4">
              <div className="flex items-center gap-1 text-xl font-semibold">
                <span>{ride.from}</span>
                <HiArrowRight className="h-5 w-5" />
                <span>{ride.to}</span>
              </div>
              <div className="flex items-center gap-1 text-sm font-bold text-muted-foreground">
                <span>{format(new Date(ride.startDate), "HH:mm")}</span>
                <HiArrowRight className=" h-4 w-4" />
                <span>{format(new Date(ride.endDate), "HH:mm")}</span>
              </div>
            </CardTitle>
            <h2 className="font-medium text-muted-foreground">
              {format(new Date(ride.startDate), "PPPP")}
            </h2>
            <div className="!mt-3 flex items-center space-x-2">
              <Image
                src={ride.driver.imageUrl}
                className="h-9 w-9 rounded-full"
                alt="User Avatar"
                width={35}
                height={35}
              />
              <span className="flex font-bold">{ride.driver.firstName}</span>
            </div>
          </div>
          <div className="mt-2 flex gap-3 text-lg sm:mt-0 sm:flex-col sm:gap-0">
            <div className="flex items-center justify-end space-x-2">
              <span className="font-bold">{ride.price} zł</span>
              <span className="text-muted-foreground">per seat</span>
            </div>
            <div className="flex items-center justify-end space-x-2">
              <FaLocationPinLock className="h-4 w-4" />
              <div>
                <span className="font-bold">
                  {ride.seats - (ride.passengers ? ride.passengers.length : 0)}
                </span>
                <span className="text-muted-foreground"> seats left</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default RideRecordCard;
