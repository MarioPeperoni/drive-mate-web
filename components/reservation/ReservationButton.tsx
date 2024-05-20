"use client";

import axios, { AxiosError } from "axios";
import { useAuth, useUser } from "@clerk/nextjs";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { Skeleton } from "@/components/ui/skeleton";

import { FaBolt, FaTrash } from "react-icons/fa6";

interface ReservationElementProps {
  ride: Ride;
}

const ReservaionButton = ({ ride }: ReservationElementProps) => {
  const { getToken } = useAuth();
  const user = useUser();

  const onReserve = async () => {
    const token = await getToken();
    axios
      .put(
        `http://localhost:5103/api/rides/${ride.id}`,
        {},
        {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        },
      )
      .then((res) => {
        toast({
          title: "Ride reserved!",
          description: "You have successfully reserved your seat",
        });
      })
      .catch((error: AxiosError) => {
        toast({
          title: "Error",
          // @ts-ignore
          description: error.response!.data || "Something went wrong",
          variant: "destructive",
        });
      });
  };

  const onDelete = async () => {
    const token = await getToken();
    axios
      .delete(`http://localhost:5103/api/rides/${ride.id}`, {
        headers: {
          Authorization: "Bearer " + token,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        toast({
          title: "Ride removed!",
          description: "You have successfully removed your listing",
        });
      })
      .catch((error: AxiosError) => {
        toast({
          title: "Error",
          // @ts-ignore
          description: error.response!.data || "Something went wrong",
          variant: "destructive",
        });
      });
  };

  const reserved = ride.passengers
    .map((passenger) => passenger.user.username)
    .includes(user.user?.username ?? "");

  const yourRide = ride.driver.username === user.user?.username;

  if (!user.isLoaded) {
    return <Skeleton className="h-32 w-full" />;
  }

  if (reserved) {
    return null;
  }

  return (
    <Card className="w-full">
      <CardContent className="flex items-center justify-end space-x-5 pt-6">
        {yourRide ? (
          <>
            <div className="flex flex-col items-end">
              <span className="mx-auto justify-center text-center font-bold">
                This is your listing
              </span>
            </div>
            <Button
              className="w-48 space-x-2"
              variant={"destructive"}
              onClick={onDelete}
            >
              <FaTrash />
              <span>Remove listing</span>
            </Button>
          </>
        ) : (
          <>
            <div className="flex flex-col items-end justify-end">
              <span className="text-sm">Total to pay:</span>
              <span className="text-3xl font-bold">{ride.price}zł</span>
            </div>
            <Button className=" w-48 space-x-2" onClick={onReserve}>
              <FaBolt />
              <span>Reserve</span>
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ReservaionButton;
