type Ride = {
  id: number;
  from: string;
  to: string;
  userId: number;
  driver: User;
  passengers: Passenger[];
  startDate: Date;
  endDate: Date;
  price: number;
  seats: number;
  car: string;
  createdAt: Date;
  updatedAt: Date;
};
