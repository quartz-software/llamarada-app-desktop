import { FC, ReactNode } from "react";
import "./Modal.css";

type Props = {
  children: ReactNode;
  onClose: Function;
  title: string;
};

const Modal: FC<Props> = ({ children, onClose, title }) => {
  return (
    <div className="modal">
      <div
        className="modal__overlay"
        onClick={(e) => {
          if (
            e.target instanceof HTMLDivElement &&
            e.target.classList.contains("modal__overlay")
          ) {
            onClose();
          }
        }}
      ></div>
      <div className="modal__content">
        <h2>{title}</h2>
        {children}
      </div>
    </div>
  );
};

export default Modal;
