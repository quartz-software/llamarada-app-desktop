import "./FormField.css";
import { FC, ReactElement } from "react";
import Input from "./Input";

type Props = {
  label: string;
  children: ReactElement<typeof Input>;
  modifier?: string;
  errorMessage: string;
};

const FormField: FC<Props> = ({
  label,
  children,
  errorMessage = undefined,
  modifier,
}) => {
  return (
    <div className={"form-field " + "form-field--" + modifier}>
      <label className="form-field__label">{label}</label>
      {children}
      <p className={"form-field__message " + (errorMessage ? "visible " : "")}>
        {errorMessage ? errorMessage : ""}
      </p>
    </div>
  );
};
export default FormField;
