import { useEffect, useState } from "react";
import axios from "axios";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

import DriveListing from "@/components/profile/DriveListing";

const RidesAsPassagerCard = ({ userId }: { userId: string }) => {
  const [rides, setRides] = useState<Ride[]>([]);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    const fetchRides = async () => {
      await axios
        .get(`http://localhost:5103/api/users/${userId}/passenger`)
        .then((res) => {
          setRides(res.data as Ride[]);
          setIsFetching(false);
        });
    };
    fetchRides();
  }, []);

  if (isFetching) {
    return <Skeleton className="h-32 w-full" />;
  }

  return (
    <section>
      <Card>
        <CardHeader>
          <CardTitle>Rides as passager ({rides.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-1">
          {rides.length > 0
            ? rides.map((ride) => <DriveListing ride={ride} key={ride.id} />)
            : !isFetching && (
                <p className="text-center text-muted-foreground">
                  You have no rides as passager
                </p>
              )}
        </CardContent>
      </Card>
    </section>
  );
};

export default RidesAsPassagerCard;
