import Link from "next/link";

import { cn } from "@/lib/utils";
import { format, differenceInDays } from "date-fns";

import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

import { FaChevronRight } from "react-icons/fa";

interface DriveListingProps {
  ride: Ride;
}

const DriveListing = ({ ride }: DriveListingProps) => {
  const currentDate = new Date();
  const daysDifference = differenceInDays(ride.startDate, currentDate);

  const badgeText =
    daysDifference >= 0 ? `in ${daysDifference} days` : "in the past";

  return (
    <Card>
      <Link href={`/ride/${ride.id}`}>
        <CardContent className="group flex items-center justify-between py-2 hover:cursor-pointer">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-bold">
                {ride.from} - {ride.to}
              </h3>
              <Badge
                className={cn(
                  daysDifference >= 0
                    ? "bg-indigo-300  hover:bg-indigo-200"
                    : "bg-muted-foreground",
                )}
              >
                {badgeText}
              </Badge>
            </div>
            <h4>{format(ride.startDate, "PPPP")}</h4>
          </div>
          <div className="flex select-none items-center gap-2 hover:cursor-pointer">
            <p className="text-sm opacity-0 transition duration-500 group-hover:opacity-100">
              See details
            </p>
            <FaChevronRight />
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default DriveListing;
