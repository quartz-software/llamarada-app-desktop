import { FC, useState } from "react";
import Button from "../../common/components/Button";
import FormField from "../../common/components/FormField";
import Input from "../../common/components/Input";
import "./ModalClientForm.css";

type Props = {
  onClose: Function;
};

const Cliente_Formulario_Modal: FC<Props> = ({ onClose }) => {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    role: "client",
  });
  const [clientData, setClientData] = useState<Client>({
    id: 0,
    country: "",
    user: {
      id: 0,
      firstname: "",
      middlename: "",
      lastname1: "",
      lastname2: "",
      phone: "",
      dni: "",
      documentType: "",
      address: "",
    },
  });

  function postDataClient() {
    let url = "/api/clients";
    let cont = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        client: {
          country: clientData.country,
        },
        user: {
          address: clientData.user?.address,
          documentType: clientData.user?.documentType,
          firstname: clientData.user?.firstname,
          middlename: clientData.user?.middlename,
          lastname1: clientData.user?.lastname1,
          lastname2: clientData.user?.lastname2,
          phone: clientData.user?.phone,
          dni: clientData.user?.dni,

          email: userData.email,
          password: userData.password,
          role: "client",
        },
      }),
    };

    fetch(url, cont)
      .then((res) => {
        if (res.status == 201) {
          onClose();
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <div className="modal-content">
          <h2>Nuevo Cliente</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <FormField label="Primer nombre:" errorMessage="">
              <Input
                type="text"
                placeholder="Primer nombre"
                handleInput={(value: string) => {
                  setClientData({
                    ...clientData,
                    user: {
                      ...clientData.user!,
                      firstname: value,
                    },
                  });
                }}
                value={clientData.user ? clientData.user.firstname : ""}
                resetMessage={() => {}}
              />
            </FormField>
            <FormField label="Segundo nombre:" errorMessage="">
              <Input
                type="text"
                placeholder="Segundo nombre"
                handleInput={(value: string) => {
                  setClientData({
                    ...clientData,
                    user: {
                      ...clientData.user!,
                      middlename: value,
                    },
                  });
                }}
                value={clientData.user ? clientData.user.middlename ?? "" : ""}
                resetMessage={() => {}}
              />
            </FormField>
            <FormField label="Primer apellido:" errorMessage="">
              <Input
                type="text"
                placeholder="Primer Apellido"
                handleInput={(value: string) => {
                  setClientData({
                    ...clientData,
                    user: {
                      ...clientData.user!,
                      lastname1: value,
                    },
                  });
                }}
                value={clientData.user ? clientData.user.lastname1 : ""}
                resetMessage={() => {}}
              />
            </FormField>
            <FormField label="Segundo apellido:" errorMessage="">
              <Input
                type="text"
                placeholder="Segundo Apellido"
                handleInput={(value: string) => {
                  setClientData({
                    ...clientData,
                    user: {
                      ...clientData.user!,
                      lastname2: value,
                    },
                  });
                }}
                value={clientData.user ? clientData.user.lastname2 ?? "" : ""}
                resetMessage={() => {}}
              />
            </FormField>
            <FormField label="Email:" errorMessage="">
              <Input
                placeholder="Correo Electronico"
                handleInput={(value: string) => {
                  setUserData({ ...userData, email: value });
                }}
                type="text"
                value={userData.email}
                resetMessage={() => {}}
              />
            </FormField>
            <FormField label="Contraseña:" errorMessage="">
              <Input
                type="text"
                placeholder="Contraseña"
                handleInput={(value: string) => {
                  setUserData({ ...userData, password: value });
                }}
                value={userData.password}
                resetMessage={() => {}}
              />
            </FormField>
            <FormField label="Celular:" errorMessage="">
              <Input
                type="text"
                placeholder="Número de celular"
                handleInput={(value: string) => {
                  setClientData({
                    ...clientData,
                    user: {
                      ...clientData.user!,
                      phone: value,
                    },
                  });
                }}
                value={clientData.user ? clientData.user.phone : ""}
                resetMessage={() => {}}
              />
            </FormField>
            <FormField label="País:" errorMessage="">
              <Input
                type="text"
                placeholder="País de procedencia"
                handleInput={(value: string) => {
                  setClientData({ ...clientData, country: value });
                }}
                value={clientData.country}
                resetMessage={() => {}}
              />
            </FormField>
            <FormField label="DNI:" errorMessage="">
              <Input
                type="text"
                placeholder="DNI"
                handleInput={(value: string) => {
                  setClientData({
                    ...clientData,
                    user: { ...clientData.user!, dni: value },
                  });
                }}
                value={clientData.user ? clientData.user.dni : ""}
                resetMessage={() => {}}
              />
            </FormField>
            <FormField label="Tipo de documento:" errorMessage="">
              <Input
                type="text"
                placeholder="Tipo de documento"
                handleInput={(value: string) => {
                  setClientData({
                    ...clientData,
                    user: { ...clientData.user!, documentType: value },
                  });
                }}
                value={clientData.user ? clientData.user.documentType : ""}
                resetMessage={() => {}}
              />
            </FormField>
            <FormField label="Dirección:" errorMessage="">
              <Input
                type="text"
                placeholder="Dirección"
                handleInput={(value: string) => {
                  setClientData({
                    ...clientData,
                    user: { ...clientData.user!, address: value },
                  });
                }}
                value={clientData.user ? clientData.user.address : ""}
                resetMessage={() => {}}
              />
            </FormField>
            <div className="div--btns">
              <Button
                disabled={false}
                handleClick={() => {
                  onClose();
                }}
              >
                Cerrar
              </Button>
              <Button disabled={false} handleClick={postDataClient}>
                Guardar
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cliente_Formulario_Modal;
