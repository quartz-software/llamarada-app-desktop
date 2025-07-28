import { useEffect, useState } from "react";
// import "./Index.css";;
import StockList from "./components/StockList";
import { Stock } from "@/shared/types/db/stock";
import StockModal from "./components/StockModal";
import StockModalEdit from "./components/StockModalEdit";
import { toast } from "sonner";
// import { Button } from "@/shared/components/ui/button";

const Index = () => {
  const [stock, setStock] = useState<Stock[]>([]);
  const [isFormOpen, setFormOpen] = useState(false);
  const [isYesNoOpen, setYesNoOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<Stock>({
    id: -1,
    precio: 0.00,
    idCategoria: 1,
    unidadMedida: "bs",
    nombre: "",
    cantidad: 0,
  });

  const handleSave = async (item: Stock) => {
    let url = `/api/stock/${item.id > 0 ? item.id : ""}`
    console.log(url);
    const res = await fetch(url,
      {
        method: item.id <= 0 ? "POST" : "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      }
    )
    if (res.status === 201 || res.status === 204) {
      toast.success("Producto guardado")
      getStockData();
      setFormOpen(false);
    };
  };
  const handleEdit = (item: Stock) => {
    setItemToEdit(item);
    setFormOpen(true);
  };
  const handleDelete = (id: number) => {
    fetch(`/api/stock/${id}`, { method: "DELETE" }).then((req) => {
      if (req.status === 200) {
        setStock([...stock.filter((i) => i.id != id)]);
        setYesNoOpen(false);
      }
    });
  };
  /*const modalConfirm = (
    <Modal
      onClose={() => { }}
      title="¿Estas seguro que deseas eliminar el elemento?"
    >
      <Button handleClick={() => handleDelete(itemToEdit.id)}>Eliminar</Button>
      <Button
        handleClick={() => {
          setYesNoOpen(false);
        }}
      >
        Cancelar
      </Button>
    </Modal>
  ); */

  async function getStockData() {
    try {
      const res = await fetch("/api/stock")
      const data = await res.json()
      setStock(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getStockData()
  }, []);

  return (
    <div className="space-y-6">
      <h1>Inventario</h1>
      <StockModal onSave={handleSave} />
      <StockModalEdit
        item={itemToEdit}
        onSave={handleSave}
        open={isFormOpen}
        setOpen={setFormOpen}
      />
      <StockList
        stock={stock}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Index;
