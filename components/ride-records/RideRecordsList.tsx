import axios from 'axios';

import RideRecordCard from '@/components/ride-records/RideRecordCard';

async function getRides() {
  const response = await axios.get('http://localhost:5103/api/rides').then((res) => res.data);
  return response as Ride[];
}

export async function CardRecordsList() {
  const rides = await getRides();
  return (
    <div className="mt-5 space-y-3">
      {rides.map((ride, index) => (
        <RideRecordCard key={index} ride={ride} />
      ))}
    </div>
  );
}

export default CardRecordsList;
