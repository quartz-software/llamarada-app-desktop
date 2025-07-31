import { useEffect, useState } from "react";
import StockList from "./components/StockList";
import { Stock } from "@/shared/types/db/stock";
import StockModal from "./components/StockModal";
import StockModalEdit from "./components/StockModalEdit";
import { toast } from "sonner";
import { Label } from "@/shared/components/ui/label";
import { Input } from "@/shared/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/shared/components/ui/select";
import AlertDelete from "@/shared/components/AlertDelete";

const Index = () => {
  const [stock, setStock] = useState<Stock[]>([]);
  const [isFormOpen, setFormOpen] = useState(false);
  const [isAlertOpen, setAlertOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<Stock>({
    id: -1,
    precio: 0.00,
    idCategoria: 1,
    unidadMedida: "bs",
    nombre: "",
    cantidad: 0,
  });
  const [itemToDelete, setItemToDelete] = useState(0)
  const [searchNombre, setSearchNombre] = useState("")
  const [categoriaFiltro, setCategoriaFiltro] = useState("all")
  const filteredStock = stock.filter((i) => {
    const matchesNombre = i.nombre.toLowerCase().trim().includes(searchNombre.toLowerCase().trim())
    const matchesTipo = categoriaFiltro === "all" ? true : String(i.idCategoria) === categoriaFiltro
    return matchesNombre && matchesTipo
  })

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
  const OpenAlertDelet = (id: number) => {
    setItemToDelete(id);
    setAlertOpen(true);
  };
  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`/api/stock/${id}`, { method: "DELETE" })
      if (res.status === 204) {
        getStockData();
        setAlertOpen(false);
        toast.success("Producto eliminado")
      }
    } catch (error) {
      console.error(error);

    }
  };
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
    <div className="space-y-5">
      <div className="flex justify-between items-end">
        <div className="flex gap-4">
          <div>
            <Label className="mb-2">Buscar</Label>
            <Input
              placeholder="Nombre..."
              value={searchNombre}
              onChange={(e) => setSearchNombre(e.target.value)}
            />
          </div>
          <div>
            <Label className="mb-2">Tipo</Label>
            <Select
              value={categoriaFiltro}
              onValueChange={(value) => setCategoriaFiltro(value)}
            >
              <SelectTrigger className="w-[130px]">
                <SelectValue placeholder="Tipo de habitación" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="all">Todos</SelectItem>
                  <SelectItem value="1">Limpieza</SelectItem>
                  <SelectItem value="2">Alimento</SelectItem>
                  <SelectItem value="3">Mantenimiento</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <StockModal onSave={handleSave} />
      </div>

      <StockModalEdit
        item={itemToEdit}
        onSave={handleSave}
        open={isFormOpen}
        setOpen={setFormOpen}
      />

      <AlertDelete
        id={itemToDelete}
        onDelete={handleDelete}
        open={isAlertOpen}
        setOpen={setAlertOpen}
      />

      <StockList
        stock={filteredStock}
        onEdit={handleEdit}
        onDelete={OpenAlertDelet}
      />

    </div>
  );
};

export default Index;
