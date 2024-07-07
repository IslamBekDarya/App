import React, { useMemo, useState } from "react";
import { AppContextConfig } from "../config";

interface IProps {
  children: React.ReactNode;
}

function AppContext({ children }: IProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [todoID, setTodoID] = useState<string | number>("")

  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal =() => {
    setIsModalOpen(false)
  }

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleTodoID = (id: string | number) => {
    setTodoID(id)
  }

  const values = useMemo(
    () => ({
      isModalOpen,
      setIsModalOpen,
      showModal,
      handleOk,
      hideModal,
      handleCancel,
      todoID,
      setTodoID,
      handleTodoID
    }),
    [isModalOpen, todoID]
  );

  return (
    <AppContextConfig.Provider value={values}>
      {children}
    </AppContextConfig.Provider>
  );
}

export default AppContext;
