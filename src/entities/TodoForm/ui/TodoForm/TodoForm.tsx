import { Button, Form, FormProps, Input } from "antd";
import { memo, useEffect } from "react";
import styles from "./TodoForm.module.scss";
import { v4 } from "uuid";
import { ITodo } from "@/shared/types/itemTodo";
import { useContextHook } from "@/shared/hooks/useContextHook";
import { getLocalTodos } from "@/App";

interface IProps {
  addTodo: (data: ITodo) => void;
}

type FieldType = {
  title: string;
  desc: string;
  id?: string | number;
};

function TodoForm({ addTodo }: IProps) {
  let onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    const newTodo = { id: v4(), ...values };
    addTodo(newTodo);
  };

  const onFinishFailed: FormProps<FieldType>["onFinishFailed"] = (
    errorInfo
  ) => {
    const newErrorTodo = { id: v4(), ...errorInfo };
    console.log(newErrorTodo);
  };

  const { todoID, setTodoID, hideModal } = useContextHook();

  useEffect(() => {
    if (todoID) {
      const findTodoElement = getLocalTodos().find((el) => el.id === todoID);
      console.log(findTodoElement?.id);
      console.log(findTodoElement?.title);
      

      return () => {
        setTodoID("");
      };
    }
  }, [todoID, setTodoID]);

  return (
    <Form
      onSubmitCapture={hideModal}
      className={styles.form}
      name="basic"
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete="off"
    >
      <Form.Item<FieldType>
        name="title"
        rules={[{ required: true, message: "Please enter your name!" }]}
      >
        <Input
          autoFocus
          name="title"
          type="text"
          className={styles.input}
          placeholder="Enter your name"
        />
      </Form.Item>

      <Form.Item<FieldType>
        name="desc"
        rules={[{ required: true, message: "Please enter your description!" }]}
      >
        <Input
          name="desc"
          type="text"
          className={styles.input}
          placeholder="Enter your description"
        />
      </Form.Item>

      <Form.Item>
        <Button className={styles.addBtn} type="primary" htmlType="submit">
          Add Todo
        </Button>
      </Form.Item>
    </Form>
  );
}

export default memo(TodoForm);
