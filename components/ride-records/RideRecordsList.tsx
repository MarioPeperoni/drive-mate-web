"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import axios from "axios";

import { Skeleton } from "@/components/ui/skeleton";

import RideRecordCard from "@/components/ride-records/RideRecordCard";

const CardRecordsListLoading = () => (
  <div className=" space-y-3" data-testid={"loading-skeleton"}>
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

  const paramsForSearch = searchParams.has("from") && searchParams.has("to");

  useEffect(() => {
    const fetchData = async () => {
      setIsFetching(true);
      if (paramsForSearch) {
        await axios
          .get(
            `http://localhost:5103/api/rides/search?from=${searchParams.get("from")}&to=${searchParams.get("to")}&startDate=${searchParams.get("startDate")}`,
          )
          .then((res) => setRides(res.data))
          .then(() => setIsFetching(false));
      } else {
        await axios
          .get("http://localhost:5103/api/rides")
          .then((res) => setRides(res.data))
          .then(() => setIsFetching(false));
      }
    };
    fetchData();
  }, [paramsForSearch]);

  return (
    <div className="mt-5 space-y-3" data-testid={"ride-records-list"}>
      {isFetching ? (
        <CardRecordsListLoading />
      ) : rides.length === 0 ? (
        <p className="text-center text-muted-foreground">No rides found</p>
      ) : (
        rides.map((ride, index) => <RideRecordCard key={index} ride={ride} />)
      )}
    </div>
  );
}

export default CardRecordsList;
