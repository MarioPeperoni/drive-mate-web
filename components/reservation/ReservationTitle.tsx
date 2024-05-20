import Image from "next/image";
import { format } from "date-fns";

import { HiArrowRight } from "react-icons/hi";
import { FaCar, FaCarSide } from "react-icons/fa";

import { Card, CardContent } from "@/components/ui/card";

interface ReservationElementProps {
  ride: Ride;
}

const ReservationTitle = ({ ride }: ReservationElementProps) => {
  return (
    <section className="flex w-full flex-col gap-2 lg:flex-row">
      <Card className="flex-1">
        <CardContent className="space-y-2 pt-6">
          <p className="text-center font-medium">
            {format(ride.startDate, "PPPP")}
          </p>
          <section className="flex items-center justify-center gap-2">
            <div className="flex flex-col items-center justify-center">
              <span className="text-xl font-bold">{ride.from}</span>
              <span className="text-sm text-secondary-foreground">
                {format(ride.startDate, "p")}
              </span>
            </div>
            <div className="flex">
              <HiArrowRight className="text-2xl" />
              <HiArrowRight className="text-2xl" />
              <HiArrowRight className="text-2xl" />
            </div>
            <div className="flex flex-col items-center justify-center">
              <span className="text-xl font-bold">{ride.to}</span>
              <span className="text-sm text-secondary-foreground">
                {format(ride.endDate, "p")}
              </span>
            </div>
          </section>
        </CardContent>
      </Card>
      <Card className="flex-1">
        <CardContent className="flex h-full items-center justify-around space-y-2 pt-6">
          <div className="flex items-center justify-center gap-2">
            <Image
              src={ride.driver.imageUrl}
              alt="Driver"
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="flex flex-col justify-center">
              <span className="text-lg font-medium">
                {ride.driver.firstName} {ride.driver.lastName}
              </span>
              <span className="tex-sm -mt-1 flex items-center gap-1 font-light text-muted-foreground ">
                <FaCarSide />
                <span className="">
                  Rides completed:{" "}
                  <span className=" font-bold">
                    {ride.driver.ridesAsDriver.length}
                  </span>
                </span>
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            <FaCar className="text-3xl" />
            <span className="text-lg font-semibold">{ride.car}</span>
          </div>
        </CardContent>
      </Card>
    </section>
  );
};

export default ReservationTitle;
