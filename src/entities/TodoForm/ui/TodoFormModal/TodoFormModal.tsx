import { Modal } from "antd"
import TodoForm from "../TodoForm/TodoForm"
import { memo } from "react"
import { useContextHook } from "@/shared/hooks/useContextHook"
import styles from "./TodoFormModal.module.scss"
import { ITodo } from "@/shared/types/itemTodo"

interface IProps {
  addTodo: (data:ITodo) => void
}

function TodoFormModal({addTodo}: IProps) {

  const {isModalOpen, handleCancel, handleOk} = useContextHook()

  return (
    
    <Modal
          className={styles.modal}
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
        >
            <TodoForm addTodo={addTodo}/>
        </Modal>
  )
}

export default memo(TodoFormModal)
