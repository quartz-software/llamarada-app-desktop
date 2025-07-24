import { Button } from "@/shared/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table"
import { Tarifa } from "@/shared/types/db/tarifa"
import { Pen } from "lucide-react"
import { FC } from "react"
import { useNavigate } from "react-router-dom"

interface RoomRateListProps {
  rates: Tarifa[]
}

const formatDate = (dateData?: Date) => {
  if (!dateData) return "";
  const isoDate = new Date(dateData).toISOString()
  let date = isoDate.split("T")[0];
  let dateParts = date.split("-");

  return `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
};

const RoomRateList: FC<RoomRateListProps> = ({ rates }) => {
  const nav = useNavigate();

  return (
    <div className="overflow-hidden rounded-lg border">
      <Table>
        <TableHeader className="bg-muted">
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Fecha Inicio</TableHead>
            <TableHead>Fecha Fin</TableHead>
            <TableHead>Precio/noche</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead className="text-center">Editar</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rates.length !== 0 ? (
            rates.map((tarifa, index) => (
              <TableRow key={index}>
                <TableCell>{tarifa.id}</TableCell>
                <TableCell>{formatDate(tarifa.fechaInicio)}</TableCell>
                <TableCell>{formatDate(tarifa.fechaFin)}</TableCell>
                <TableCell>{tarifa.precio}</TableCell>
                <TableCell>{tarifa.activo ? "Activo" : "Deshabilitado"}</TableCell>
                <TableCell className="text-center">
                  <Button
                    variant="ghost"
                    type="button"
                    className="h-8 w-8 p-0"
                    onClick={() => nav(`/rates/edit?id=${tarifa.id}`)}
                  >
                    <Pen className="text-blue-600" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center text-muted-foreground">
                No se encontraron tarifas.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default RoomRateList