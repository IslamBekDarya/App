import { ReactNode } from "react";
import { createPortal } from "react-dom";

interface IProps {
  children?: ReactNode;
  container?: HTMLElement;
}

function Portal(props: IProps) {
  const { children, container = document.body } = props;
  return createPortal(children, container);
}

export default Portal;
