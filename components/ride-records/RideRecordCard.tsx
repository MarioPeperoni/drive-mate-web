import Image from 'next/image';
import { format } from 'date-fns';

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';

import { FaArrowRight } from 'react-icons/fa';
import { FaLocationPinLock } from 'react-icons/fa6';

interface RideRecordCardProps {
  ride: Ride;
}

const RideRecordCard = ({ ride }: RideRecordCardProps) => (
  <Card
    className={'sm:w-[80%] w-[95%] mx-auto my-auto hover:shadow-lg transition hover:cursor-pointer'}
  >
    <CardHeader className="pb-4 justify-center">
      <div className="flex justify-between">
        <div>
          <CardTitle className="flex gap-2">
            <span>{ride.from}</span>
            <FaArrowRight />
            <span>{ride.to}</span>
          </CardTitle>
          <CardDescription className="mt-2">{format(ride.rideDate, 'Pp')}</CardDescription>
        </div>
        <h2 className="flex font-bold text-2xl justify-start items-start -mt-[4px]">
          {ride.price}zł
        </h2>
      </div>
    </CardHeader>
    <CardContent className="flex justify-between">
      <div className="flex space-x-2">
        <Image
          src={ride.driver.imageUrl}
          className="rounded-full w-9 h-9"
          alt="User Avatar"
          width={35}
          height={35}
        />
        <span className="flex mt-1">{ride.driver.username}</span>
      </div>
      <div className="flex space-x-2 items-center justify-end">
        <FaLocationPinLock className=" w-4 h-4" />
        <span>{ride.seats - (ride.passengers ? ride.passengers.length : 0)} seats left</span>
      </div>
    </CardContent>
  </Card>
);

export default RideRecordCard;
