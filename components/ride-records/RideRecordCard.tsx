import { FaArrowRight } from 'react-icons/fa';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Image from 'next/image';

interface RideRecordCardProps {
  ride: {
    from: string;
    to: string;
    car: string;
    price: string;
    user: string;
    picture: string;
  };
}

const RideRecordCard = ({ ride }: RideRecordCardProps) => (
  <Card
    className={'w-[1090px] mx-auto my-auto mt-8 hover:shadow-lg transition hover:cursor-pointer'}
  >
    <CardHeader>
      <div className="flex justify-between">
        <div>
          <CardTitle className="flex gap-2">
            <span>{ride.from}</span>
            <FaArrowRight />
            <span>{ride.to}</span>
          </CardTitle>
          <CardDescription className="mt-2">{ride.car}</CardDescription>
        </div>
        <CardTitle className="flex justify-center items-right">{ride.price}</CardTitle>
      </div>
    </CardHeader>
    <div className="flex items-left ml-6">
      <Image
        src={ride.picture}
        className="rounded-full w-9 h-9"
        alt="User Avatar"
        width={35}
        height={35}
      />
      <CardContent className="flex items-right mt-1">{ride.user}</CardContent>
    </div>
  </Card>
);

export default RideRecordCard;
