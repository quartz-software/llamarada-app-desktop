import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/shared/components/ui/alert-dialog"
import { FC } from "react"

interface AlertBookingFinishiedProps {
  onFinished: () => void
  open?: boolean
  setOpen: (open: boolean) => void
}

const AlertBookingFinishied: FC<AlertBookingFinishiedProps> = ({ onFinished, open, setOpen }) => {
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>¿Desea finalizar esta reserva</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>

        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel>Canselar</AlertDialogCancel>
          <AlertDialogAction
            onClick={onFinished}
          >
            Finalizar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export default AlertBookingFinishied  