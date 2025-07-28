// import { Stock } from "@/shared/types/db/stock";
import { Button } from "@/shared/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { Stock } from "@/shared/types/db/stock";
import { priceFormat } from "@/shared/utils/priceFormat";
import { Pen, Trash } from "lucide-react";
import { FC } from "react";

interface StockListProps {
  stock: Stock[]
  onEdit: (item: Stock) => void
  onDelete: (id: number) => void
}
const StockList: FC<StockListProps> = ({ stock, onEdit, onDelete }) => {
  const StockCategoryTranslation: { [key: number]: string } = {
    1: "Limpieza",
    2: "Alimentos",
    3: "Mantenimiento",
  };
  return (
    <div className="rounded-lg border overflow-hidden">
      <Table>
        <TableHeader className="sticky top-0 z-10 bg-muted">
          <TableRow>
            <TableHead>N</TableHead>
            <TableHead>Nombre</TableHead>
            <TableHead>Cantidad</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Categoria</TableHead>
            {/* <TableHead>Ultimo Suministro</TableHead> */}
            <TableHead></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stock.length == 0 ? (
            <TableRow>
              <TableCell colSpan={6} className="h-24 text-center">
                No Existen registros
              </TableCell>
            </TableRow>
          ) : (
            stock.map((i, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{i.nombre}</TableCell>
                <TableCell>{i.cantidad}</TableCell>
                <TableCell>{priceFormat(i.precio)} BS</TableCell>
                <TableCell>{StockCategoryTranslation[i.idCategoria]}</TableCell>
                {/* <TableCell>{new Date(i.supplyDate).toLocaleDateString()}</TableCell> */}
                <TableCell className="flex items-center justify-end gap-2">
                  <Button
                    variant="default"
                    size="icon"
                    className="h-8 w-8 p-0"
                    onClick={() => onEdit(i)}>
                    <Pen />
                  </Button>
                  <Button
                    variant="destructive"
                    size="icon"
                    className="h-8 w-8 p-0"
                    onClick={() => onDelete(i.id)}
                  >
                    <Trash />
                  </Button>
                </TableCell>
              </TableRow>
            )
            )
          )}
        </TableBody>
      </Table>
    </div>
  )
}

export default StockList