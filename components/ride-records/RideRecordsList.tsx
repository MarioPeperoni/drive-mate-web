import guy from '@/avatar/guy.jpg';

import RideRecordCard from '@/components/ride-records/RideRecordCard';

const rides = [
  {
    from: 'Warszawa',
    to: 'Gdańsk',
    car: 'Honda Accord',
    price: '100 zł',
    user: 'Ryszard',
    picture: guy.src,
  },
  {
    from: 'Gdynia',
    to: 'Poznań',
    car: 'Ford Focus',
    price: '140 zł',
    user: 'Maciek',
    picture: guy.src,
  },
  {
    from: 'Kraków',
    to: 'Wrocław',
    car: 'Toyota Corolla',
    price: '120 zł',
    user: 'Alicja',
    picture: guy.src,
  },
  {
    from: 'Szczecin',
    to: 'Łódź',
    car: 'Volkswagen Golf',
    price: '110 zł',
    user: 'Kamil',
    picture: guy.src,
  },
  {
    from: 'Katowice',
    to: 'Olsztyn',
    car: 'Opel Astra',
    price: '160 zł',
    user: 'Natalia',
    picture: guy.src,
  },
];

export function CardRecordsList() {
  return (
    <div>
      {rides.map((ride, index) => (
        <RideRecordCard key={index} ride={ride} />
      ))}
    </div>
  );
}

export default CardRecordsList;
