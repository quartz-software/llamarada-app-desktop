type Room = {
  id: number;
  roomNumber: string;
  type: number;
  status: string;
  capacity: string;
  pricePerNight: string;
  description: string;
  reservas: Booking[];
};

type Booking = {
  checkIn: Date;
  checkOut: Date;
};
