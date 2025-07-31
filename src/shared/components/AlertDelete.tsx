import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/shared/components/ui/alert-dialog"
import { FC } from "react"
interface AlertDeletProps {
  id: number | null
  onDelete: (id: number) => void
  open?: boolean
  setOpen?: (open: boolean) => void
}
const AlertDelete: FC<AlertDeletProps> = ({ id, onDelete, open, setOpen }) => {
  if (!id) { return <></> }
  const handleDelete = () => {
    onDelete(id)
  }
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Desea eliminar este elemento?</AlertDialogTitle>
          <AlertDialogDescription>
            Esta operación es irreversible. El elemento será removido de forma permanente.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Canselar</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive hover:bg-destructive/85"
            type="submit"
            onClick={handleDelete}
          >
            Eliminar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AlertDelete