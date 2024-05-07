"use client";

import { useRouter } from "next/navigation";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useAuth } from "@clerk/nextjs";

import axios from "axios";

import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import DatePicker from "@/components/search/DatePicker";


import { useTransition } from "react";

const rideSchema = z.object({
  from: z.string().min(1),
  to: z.string().min(1),
  startDate: z.date(),
  endDate: z.date(),
  car: z.string().min(1),
  seats: z.string().min(1),
  price: z.string().min(1)
});

const AddRideCard = () => {
  const router = useRouter();
  const { getToken } = useAuth();
  const [isSubmiting, startSubmiting] = useTransition()

  const form = useForm<z.infer<typeof rideSchema>>({
    resolver: zodResolver(rideSchema),
    defaultValues: {
      startDate: new Date(Date.now()),
      endDate: new Date(Date.now()),
    },
  });

  const onSubmit = (values: z.infer<typeof rideSchema>) => {
    const submit = async () => {
        
        const token = await getToken();
        const parseValues = rideSchema.safeParse(values)
        await axios.post("https://localhost:57407/api/rides/", values, {
            headers: {
              Authorization: "Bearer " + token,
              "Content-Type": "application/json",
            },
          })
          router.push("/")
    }
    startSubmiting(()=>{

        submit();

    })
  };

  return (
    <Card className="mx-auto mt-5 w-[95%] sm:w-[90%]">
      <CardHeader className="text-xl font-bold">Create new Ride</CardHeader>
      <CardContent className="!p-3">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
          <div>
            <CardDescription className="text-md font-bold">Choose your starting point</CardDescription>
            <FormField
              control={form.control}
              name="from"
              render={({ field }) => (
                <FormItem className="flex-1 mt-2">
                  <Input placeholder="I'm starting from..." {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <CardDescription className="text-md font-bold mt-5">Choose where are you going to</CardDescription>
            <FormField
              control={form.control}
              name="to"
              render={({ field }) => (
                <FormItem className="flex-1 mt-2">
                  <Input placeholder="I'm going to..." {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <CardDescription className="text-md font-bold mt-5">Choose date the Ride will happen</CardDescription>
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => <DatePicker field={field} />}
              
            />
            
            <FormField
              control={form.control}
              name="endDate"
              render={({ field }) => <DatePicker field={field} />}
            />
            <CardDescription className="text-md font-bold mt-5">Type in model of your car</CardDescription>
            <FormField
              control={form.control}
              name="car"
              render={({ field }) => (
                <FormItem className="flex-1 mt-2">
                  <Input placeholder="I'm driving..." {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <CardDescription className="text-md font-bold mt-5">Tell us how many people can you bring with you</CardDescription>
            <FormField
              control={form.control}
              name="seats"
              render={({ field }) => (
                <FormItem className="flex-1 mt-2">
                  <Input placeholder="I can take...people" {...field} />
                  <FormMessage />
                </FormItem>
                
              )}
            />
            <CardDescription className="text-md font-bold mt-5">Tell people how much will they have to pay</CardDescription>
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem className="flex-1 mt-2">
                  <Input placeholder="That will cost..." {...field} />
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex-5 mt-5">
                <Button type="submit">Add a ride</Button>
            </div>
            </div>
            
            
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default AddRideCard;
