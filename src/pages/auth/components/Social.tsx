import { FC } from "react";
import "./Social.css";

type Props = { red: string };

const Social: FC<Props> = ({ red }) => {
  return (
    <a className="social">
      <img src={red} alt="Google" className="social__icon" />
    </a>
  );
};
export default Social;
