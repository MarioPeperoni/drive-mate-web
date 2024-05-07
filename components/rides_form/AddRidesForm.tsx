"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@clerk/nextjs";

import axios from "axios";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";

import DatePicker from "@/components/rides_form/DateTimePicker";

const rideSchema = z.object({
  from: z.string().min(1),
  to: z.string().min(1),
  startDate: z.date(),
  car: z.string().min(1),
  seats: z.string().min(1),
  price: z.string().min(1),
});

const AddRideCard = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { getToken } = useAuth();
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [isSubmiting, startSubmiting] = useTransition();

  const form = useForm<z.infer<typeof rideSchema>>({
    resolver: zodResolver(rideSchema),
  });

  const onSubmit = (values: z.infer<typeof rideSchema>) => {
    const submit = async () => {
      const token = await getToken();
      await axios
        .post("http://localhost:5103/api/rides/", values, {
          headers: {
            Authorization: "Bearer " + token,
            "Content-Type": "application/json",
          },
        })
        .then(() => {
          toast({
            title: "Ride added",
            description: "Your ride has been listed successfully",
          });
          router.push("/");
        })
        .catch((error) => {
          toast({
            title: "Error",
            description: error.response.data.message,
            variant: "destructive",
          });
        });
    };
    startSubmiting(() => {
      submit();
    });
  };

  return (
    <Card className="mx-auto mt-5 w-[95%] sm:w-[90%]">
      <CardHeader className="">
        <CardTitle className="text-3xl">Create new Ride</CardTitle>
        <CardDescription className="text-lg">
          Give us the details about your ride
        </CardDescription>
      </CardHeader>

      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-2"
          >
            <CardDescription>What city are you starting from?</CardDescription>
            <FormField
              control={form.control}
              name="from"
              render={({ field }) => (
                <FormItem>
                  <Input
                    placeholder="ex. Warsaw"
                    {...field}
                    disabled={isSubmiting}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <CardDescription>Where are you riding to?</CardDescription>
            <FormField
              control={form.control}
              name="to"
              render={({ field }) => (
                <FormItem>
                  <Input
                    placeholder="ex. Gdańsk"
                    {...field}
                    disabled={isSubmiting}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <Separator className="my-2" />
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <div>
                  <CardDescription>
                    When are you starting your drive?
                  </CardDescription>
                  <DatePicker field={field} />
                </div>
              )}
            />

            <FormField
              control={form.control}
              name="car"
              render={({ field }) => (
                <FormItem className="mt-2 flex-1">
                  <CardDescription>What is your car?</CardDescription>
                  <Input
                    placeholder="ex. Fiat Punto"
                    {...field}
                    disabled={isSubmiting}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="seats"
              render={({ field }) => (
                <FormItem className="mt-2 flex-1">
                  <CardDescription>
                    How many people can you take?
                  </CardDescription>
                  <Input
                    placeholder="ex. 4"
                    {...field}
                    disabled={isSubmiting}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="mt-2 flex-1">
                  <CardDescription>
                    How much will it cost per person? (in PLN)
                  </CardDescription>
                  <Input
                    placeholder="ex. 100"
                    {...field}
                    disabled={isSubmiting}
                  />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Card className="flex-5 mt-5">
                <CardContent className="flex flex-col gap-4 !pt-5">
                  <div className="items-top flex space-x-2">
                    <Checkbox
                      onCheckedChange={() => setTermsAccepted(!termsAccepted)}
                      checked={termsAccepted}
                    />
                    <div className="grid gap-1.5 leading-none">
                      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                        Accept terms and conditions
                      </label>
                      <p className="text-sm text-muted-foreground">
                        You agree to our Terms of Service and Privacy Policy.
                      </p>
                    </div>
                  </div>
                  <Button
                    type="submit"
                    disabled={!termsAccepted || isSubmiting}
                  >
                    Add a ride
                  </Button>
                </CardContent>
              </Card>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddRideCard;
