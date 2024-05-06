'use client';

import Image from 'next/image';
import { format } from 'date-fns';

import { Card, CardTitle, CardContent } from '@/components/ui/card';

import { HiArrowRight } from 'react-icons/hi';
import { FaLocationPinLock } from 'react-icons/fa6';

interface RideRecordCardProps {
  ride: Ride;
}

const RideRecordCard = ({ ride }: RideRecordCardProps) => {
  const handleCardClick = () => {
    console.log('Card clicked');
  };

  return (
    <Card
      className={
        'sm:w-[80%] w-[95%] mx-auto my-auto hover:shadow-lg transition hover:cursor-pointer'
      }
      onClick={handleCardClick}
    >
      <CardContent className="pb-4 justify-between p-4 flex flex-col sm:flex-row">
        <div>
          <CardTitle className="flex space-x-4 items-center">
            <div className="flex gap-1 text-xl font-semibold items-center">
              <span>{ride.from}</span>
              <HiArrowRight className="w-5 h-5" />
              <span>{ride.to}</span>
            </div>
            <div className="text-sm flex gap-1 font-bold items-center text-muted-foreground">
              <span>{format(new Date(ride.startDate), 'HH:mm')}</span>
              <HiArrowRight className=" w-4 h-4" />
              <span>{format(new Date(ride.endDate), 'HH:mm')}</span>
            </div>
          </CardTitle>
          <h2 className="text-muted-foreground font-medium">
            {format(new Date(ride.startDate), 'PPPP')}
          </h2>
          <div className="flex space-x-2 !mt-3 items-center">
            <Image
              src={ride.driver.imageUrl}
              className="rounded-full w-9 h-9"
              alt="User Avatar"
              width={35}
              height={35}
            />
            <span className="flex font-bold">{ride.driver.firstName}</span>
          </div>
        </div>
        <div className="flex text-lg sm:flex-col gap-3 sm:gap-0 mt-2 sm:mt-0">
          <div className="flex space-x-2 items-center justify-end">
            <span className="font-bold">{ride.price} zł</span>
            <span className="text-muted-foreground">per seat</span>
          </div>
          <div className="flex space-x-2 items-center justify-end">
            <FaLocationPinLock className="w-4 h-4" />
            <div>
              <span className="font-bold">
                {ride.seats - (ride.passengers ? ride.passengers.length : 0)}
              </span>
              <span className="text-muted-foreground"> seats left</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RideRecordCard;
