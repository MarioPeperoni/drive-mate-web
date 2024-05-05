type Ride = {
  id: number;
  from: string;
  to: string;
  userId: number;
  driver: User;
  passengers: Passenger[];
  rideDate: Date;
  price: number;
  seats: number;
  createdAt: Date;
  updatedAt: Date;
};
