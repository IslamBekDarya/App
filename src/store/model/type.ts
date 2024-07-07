export interface IContextValues {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: () => void;
  hideModal: () => void;
  handleOk: () => void;
  handleCancel: () => void;
  todoID: string | number;
  setTodoID: React.Dispatch<React.SetStateAction<string | number>>;
  handleTodoID: (id: string | number) => void;
}
