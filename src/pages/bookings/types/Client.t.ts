type User = {
  id: number;
  address: string;
  firstname: string;
  middlename?: string;
  lastname1: string;
  lastname2?: string;
  phone: string;
  dni: string;
  documentType: string;
};
type Client = {
  id: number;
  country: string;
  user?: User;
};
