type User = {
  id: number;
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  imageUrl: string;
  createdAt: Date;
  ridesAsDriver: Ride[];
  ridesAsPassenger: Passenger[];
};
