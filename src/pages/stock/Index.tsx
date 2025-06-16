import { useEffect, useState } from "react";
import Modal from "../../shared/components/Modal";
import FormField from "../../shared/components/FormField";
import Input from "../../shared/components/Input";
import Button from "../../shared/components/Button";
import "./Index.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

const Index = () => {
  const [stock, setStock] = useState<Stock[]>([]);
  const [isFormOpen, setFormOpen] = useState(false);
  const [isYesNoOpen, setYesNoOpen] = useState(false);
  const [itemToEdit, setItemToEdit] = useState<Stock>({
    id: 0,
    category: "food",
    price: 0,
    name: "",
    quantity: 0,
    supplyDate: "",
  });

  const StockCategoryTranslation = {
    food: "Alimentos",
    cleaning: "Limpieza",
    maintenance: "Mantenimiento",
  };

  const handleSave = () => {
    let { id, name, quantity, price, category, supplyDate } = itemToEdit;
    let isValid = true;
    if (name === "") {
      setErrors({ ...errors, name: "El nombre no puede estar vacio" });
      isValid = false;
    }
    if (quantity < 0) {
      setErrors({ ...errors, price: "La cantidad no puede ser negativa" });
      isValid = false;
    }
    if (price <= 0) {
      setErrors({ ...errors, price: "Ingresa un precio correcto" });
      isValid = false;
    }
    if (supplyDate === "") {
      setErrors({ ...errors, supplyDate: "Ingresa una fecha valida" });
      isValid = false;
    }
    if (!isValid) return;

    fetch(`/api/stock/${id > 0 ? id : ""}`, {
      method: id <= 0 ? "POST" : "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        quantity,
        price,
        category,
        supplyDate,
      }),
    }).then((req) => {
      if (req.status === 200 || req.status === 201) {
        setStock(
          stock.map((i) => {
            if (i.id == itemToEdit.id) {
              i.name = name;
              i.quantity = quantity;
              i.price = price;
              i.category = category;
              i.supplyDate = supplyDate;
            }
            return i;
          })
        );
        resetForm();
        setFormOpen(false);
      }
    });
  };
  const handleEdit = (item: Stock) => {
    setItemToEdit(item);
    setFormOpen(true);
  };
  const resetForm = () => {
    setItemToEdit({
      id: 0,
      category: "food",
      price: 0,
      name: "",
      quantity: 0,
      supplyDate: "",
    });
    setErrors({
      category: "",
      name: "",
      price: "",
      quantity: "",
      supplyDate: "",
    });
  };
  const handleDelete = (id: number) => {
    fetch(`/api/stock/${id}`, { method: "DELETE" }).then((req) => {
      if (req.status === 200) {
        setStock([...stock.filter((i) => i.id != id)]);
        setYesNoOpen(false);
      }
    });
  };
  const handleCloseModal = () => {
    setFormOpen(false);
    resetForm();
  };
  const [errors, setErrors] = useState({
    category: "",
    name: "",
    price: "",
    quantity: "",
    supplyDate: "",
  });
  const modalForm = (
    <Modal
      title={itemToEdit.id <= 0 ? "Crear" : "Editar"}
      onClose={handleCloseModal}
    >
      <FormField errorMessage={errors.name} label="Nombre">
        <Input
          value={itemToEdit.name}
          handleInput={(value: string) => {
            setItemToEdit({ ...itemToEdit, name: value });
          }}
          type="text"
          placeholder="Nombre"
          resetMessage={() => {
            setErrors({ ...errors, name: "" });
          }}
        />
      </FormField>
      <FormField errorMessage={errors.quantity} label="Cantidad">
        <Input
          value={itemToEdit.quantity.toString()}
          handleInput={(value: number) => {
            setItemToEdit({ ...itemToEdit, quantity: value });
          }}
          type="number"
          placeholder="Cantidad"
          resetMessage={() => {
            setErrors({ ...errors, quantity: "" });
          }}
          min={0}
        />
      </FormField>
      <FormField errorMessage={errors.price} label="Precio">
        <Input
          value={itemToEdit.price.toString()}
          handleInput={(value: number) => {
            setItemToEdit({ ...itemToEdit, price: value });
          }}
          type="number"
          placeholder="Cantidad"
          resetMessage={() => {
            setErrors({ ...errors, price: "" });
          }}
          min={0}
        />
      </FormField>
      <FormField errorMessage={errors.category} label="Categoria">
        <select
          value={itemToEdit.category}
          onChange={(e) => {
            setItemToEdit({
              ...itemToEdit,
              category: e.target.value as StockCategory,
            });
          }}
        >
          <option value={"food"}>Comida</option>
          <option value={"cleaning"}>Limpieza</option>
          <option value={"mantainance"}>Mantenimiento</option>
        </select>
      </FormField>
      <FormField errorMessage={errors.supplyDate} label="Fecha de Suministro">
        <Input
          value={
            itemToEdit.supplyDate !== ""
              ? new Date(itemToEdit.supplyDate).toISOString().split("T")[0]
              : ""
          }
          handleInput={(value: string) => {
            setItemToEdit({ ...itemToEdit, supplyDate: value });
          }}
          type="date"
          resetMessage={() => {
            setErrors({ ...errors, supplyDate: "" });
          }}
        />
      </FormField>
      <Button handleClick={handleSave}>Guardar</Button>
      <Button handleClick={handleCloseModal}>Cancelar</Button>
    </Modal>
  );
  const modalConfirm = (
    <Modal
      onClose={() => {}}
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
  );

  useEffect(() => {
    fetch("/api/stock")
      .then((req) => req.json())
      .then((data) => {
        setStock(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="index-stock">
      <h1>Inventario</h1>
      {isFormOpen && modalForm}
      {isYesNoOpen && modalConfirm}

      <Button
        handleClick={() => {
          setFormOpen(true);
        }}
      >
        Agregar
      </Button>
      <div className="list-container">
        <table className="list-table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Nombre</th>
              <th>Cantidad</th>
              <th>Precio</th>
              <th>Categoria</th>
              <th>Ultimo Suministro</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {stock.length == 0 ? (
              <tr>
                <td style={{ textAlign: "center" }} colSpan={7}>
                  No Existen registros
                </td>
              </tr>
            ) : (
              stock.map((i) => {
                return (
                  <tr>
                    <td>{i.id}</td>
                    <td>{i.name}</td>
                    <td>{i.quantity}</td>
                    <td>{i.price} bs</td>
                    <td>{StockCategoryTranslation[i.category]}</td>
                    <td>{new Date(i.supplyDate).toLocaleDateString()}</td>
                    <td className="actions">
                      <div>
                        <Button handleClick={() => handleEdit(i)}>
                          <FontAwesomeIcon icon={faPen} />
                        </Button>
                        <Button
                          handleClick={() => {
                            setItemToEdit({ ...itemToEdit, id: i.id });
                            setYesNoOpen(true);
                          }}
                        >
                          <FontAwesomeIcon icon={faTrash} />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Index;
