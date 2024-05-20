import Image from "next/image";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ReservationElementProps {
  ride: Ride;
}

const ReservationForm = ({ ride }: ReservationElementProps) => {
  return (
    <Card>
      <CardHeader className="pt-4">
        <CardTitle className=" text-lg">Other passagers on this ride</CardTitle>
      </CardHeader>
      <CardContent className=" flex flex-col gap-2">
        {ride.passengers?.map((passenger) => (
          <div className="flex items-center gap-2 hover:cursor-pointer">
            <Image
              src={passenger.user.imageUrl}
              alt="Passenger"
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className=" font-semibold">
              {passenger.user.firstName} {passenger.user.lastName}
            </span>
          </div>
        ))}
      </CardContent>
    </Card>
  );
};

export default ReservationForm;
