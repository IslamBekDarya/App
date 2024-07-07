import { ITodo } from "@/shared/types/itemTodo";
import styles from "./TodoItem.module.scss";
import { Button } from "antd";
import { memo } from "react";
// import { useContextHook } from "@/shared/hooks/useContextHook";

interface IProps {
  item: ITodo;
  deleteTodo: (id: string | number) => void
}

function TodoItem(props: IProps) {
  const {
    item: { desc, title, id },
    deleteTodo
  } = props;

  // const {showModal, handleTodoID} = useContextHook();

  // const showEditFormModal = (id: string | number) => {
  //   handleTodoID(id)
  //   showModal()
  // }

  return (
    <div className={styles.item}>
      <div className={styles.left}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.desc}>{desc}</p>
      </div>
      <div className={styles.right}>
        {/* <Button type="primary" onClick={() => showEditFormModal(id)}>Edit</Button> */}
        <Button type="primary" danger onClick={() => deleteTodo(id)}>Delete</Button>
      </div>
    </div>
  );
}

export default memo(TodoItem);
