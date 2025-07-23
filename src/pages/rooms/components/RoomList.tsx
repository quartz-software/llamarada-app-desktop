import { Button } from '@/shared/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shared/components/ui/table';
import { Habitacion } from '@/shared/types/db/habitacion';
import { ArrowUpRightFromSquareIcon } from 'lucide-react';
import { FC } from 'react'
import { useNavigate } from 'react-router-dom';

interface RoomListProps {
  rooms: Habitacion[]
}

const RoomList: FC<RoomListProps> = ({ rooms }) => {
  const nav = useNavigate();
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader className="sticky top-0 z-10 bg-muted">
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Numero</TableHead>
            <TableHead>Tipo</TableHead>
            <TableHead>Capacidad</TableHead>
            {/* <TableHead>Precio/noche</TableHead> */}
            <TableHead>Estado</TableHead>
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rooms.length !== 0 ?
            (rooms.map((habitacion, index) => {
              return (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{habitacion.numeroHabitacion}</TableCell>
                  <TableCell>
                    {habitacion.tipo && habitacion.tipo.nombre
                      ? habitacion.tipo.nombre.charAt(0).toUpperCase() + habitacion.tipo.nombre.slice(1)
                      : ""}
                  </TableCell>
                  <TableCell>{habitacion.capacidad}</TableCell>
                  {/* <td>{habitacion.pricePerNight}</td> */}
                  <TableCell>
                    {habitacion.estado && habitacion.estado.nombre
                      ? habitacion.estado.nombre.charAt(0).toUpperCase() + habitacion.estado.nombre.slice(1)
                      : ""}
                  </TableCell>
                  <TableCell className="text-end">
                    <Button
                      variant="outline"
                      type="button"
                      className="h-8 w-8 p-0"
                      onClick={() => {
                        nav(`/rooms/form?id=${habitacion.id}`);
                      }}
                    >
                      <ArrowUpRightFromSquareIcon />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })

            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                  No se encomtraron habitaciones.
                </TableCell>
              </TableRow>
            )}
        </TableBody>
      </Table>
    </div>
  )
}

export default RoomList