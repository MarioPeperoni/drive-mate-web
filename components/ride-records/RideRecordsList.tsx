"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

import { Skeleton } from "@/components/ui/skeleton";

import RideRecordCard from "@/components/ride-records/RideRecordCard";

const CardRecordsListLoading = () => (
  <div className=" space-y-3">
    <Skeleton className="mx-auto my-auto h-36 w-[95%] sm:w-[80%]" />
    <Skeleton className="mx-auto my-auto h-36 w-[95%] sm:w-[80%]" />
    <Skeleton className="mx-auto my-auto h-36 w-[95%] sm:w-[80%]" />
    <Skeleton className="mx-auto my-auto h-36 w-[95%] sm:w-[80%]" />
  </div>
);

export function CardRecordsList() {
  const [rides, setRides] = useState([]);
  const [isFetching, setIsFetching] = useState(true);
  const searchParams = useSearchParams();

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      if (searchParams.has("from") && searchParams.has("to")) {
        await axios
          .get(
            `http://localhost:5103/api/rides/search?from=${searchParams.get("from")}&to=${searchParams.get("to")}&startDate=${searchParams.get("startDate")}`,
          )
          .then((res) => setRides(res.data));
      } else {
        await axios
          .get("http://localhost:5103/api/rides")
          .then((res) => setRides(res.data));
      }
    };
    fetchData();
    setIsFetching(false);
  }, [searchParams]);

  return (
    <div className="mt-5 space-y-3">
      {isFetching ? (
        <CardRecordsListLoading />
      ) : rides.length === 0 ? (
        <div className="text-center text-muted-foreground ">No rides found</div>
      ) : (
        rides.map((ride, index) => <RideRecordCard key={index} ride={ride} />)
      )}
    </div>
  );
}

export default CardRecordsList;
