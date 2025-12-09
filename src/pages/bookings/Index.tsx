import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/shared/components/ui/tabs";
import CreateBookingTab from "./CreateBookingTab";
import ViewBookingTab from "./ViewBookingTab";


const Habitaciones = () => {
  return (
    <div>
      <Tabs defaultValue="view">
        <TabsList >
          <TabsTrigger value="view">Reservasiones</TabsTrigger>
          <TabsTrigger value="create">Nueva reservasión</TabsTrigger>
        </TabsList>
        <TabsContent value="view">
          <ViewBookingTab />
        </TabsContent>
        <TabsContent value="create">
          <CreateBookingTab />
        </TabsContent>
      </Tabs>
    </div>
  )
};

export default Habitaciones;
