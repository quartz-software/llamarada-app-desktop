import { Badge } from "@/shared/components/ui/badge";
import { Button } from "@/shared/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { Reserva } from "@/shared/types/db/reserva";
import { formatDate } from "@/shared/utils/formatDate";
import { ChevronRight } from "lucide-react";
import { FC } from "react";
import { useNavigate } from "react-router-dom";

interface BookingListProps {
  bookings: Reserva[];
}

const BookingList: FC<BookingListProps> = ({ bookings }) => {
  const BookingStatusTranslation: {
    [key: number]: {
      status: string,
      color: "default" | "outline" | "secondary" | "destructive"
    }
  } = {
    1: { status: "Activo", color: "default" },
    2: { status: "Pendiente", color: "outline" },
    3: { status: "Finalizado", color: "secondary" },
    4: { status: "Cancelado", color: "destructive" },
  };
  const nav = useNavigate()
  return (
    <div className="rounded-lg border overflow-hidden">
      <Table>
        <TableHeader className="sticky top-0 z-10 bg-muted">
          <TableRow>
            <TableHead>Habitacion</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>CheckIn</TableHead>
            <TableHead>CheckOut</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {bookings.length == 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No Existen registros
              </TableCell>
            </TableRow>
          ) : (
            bookings.map((b, index) => (
              <TableRow key={index}>
                <TableCell>{b.habitaciones?.[0]?.numeroHabitacion ?? 'N/A'}</TableCell>
                <TableCell>{`${b.cliente?.apellido1} ${b.cliente?.nombre1}`}</TableCell>
                <TableCell>{formatDate(b.checkIn)}</TableCell>
                <TableCell>{formatDate(b.checkOut)}</TableCell>
                <TableCell>
                  <Badge variant={BookingStatusTranslation[b.idEstado].color}>
                    {BookingStatusTranslation[b.idEstado].status}
                  </Badge>
                </TableCell>
                <TableCell className="flex items-center justify-end gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 p-0"
                    onClick={() => {
                      nav(`/bookings/details/${b.id}`)
                    }}>
                    <ChevronRight />
                  </Button>
                </TableCell>
              </TableRow>
            )
            )
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingList