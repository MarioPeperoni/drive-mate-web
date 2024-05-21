"use client";

import { useSearchParams, useRouter } from "next/navigation";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Card, CardContent } from "@/components/ui/card";
import { Form, FormField, FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import DatePicker from "@/components/search/DatePicker";

const searchSchema = z.object({
  from: z.string().min(1),
  to: z.string().min(1),
  startDate: z.date(),
});

const SearchCard = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const form = useForm<z.infer<typeof searchSchema>>({
    resolver: zodResolver(searchSchema),
    defaultValues: {
      from: searchParams.get("from") ?? "",
      to: searchParams.get("to") ?? "",
      startDate: new Date(searchParams.get("startDate") ?? Date.now()),
    },
  });

  const onSubmit = (values: z.infer<typeof searchSchema>) => {
    const { from, to, startDate } = values;
    startDate.setDate(startDate.getDate() + 1);
    let formattedStartDate = startDate.toISOString();
    // Set to midnight of the selected date
    formattedStartDate = formattedStartDate.slice(0, 10) + "T00:00:00Z";
    router.push(`/?from=${from}&to=${to}&startDate=${formattedStartDate}`);
  };

  return (
    <section data-testid={"search-card"}>
      <Card className="mx-auto mt-5 w-[95%] sm:w-[90%]">
        <CardContent className="!p-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
              <FormField
                control={form.control}
                name="from"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <Input placeholder="I'm starting from..." {...field} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="to"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <Input placeholder="I'm going to..." {...field} />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="startDate"
                render={({ field }) => <DatePicker field={field} />}
              />
              <Button type="submit">Search</Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </section>
  );
};

export default SearchCard;
