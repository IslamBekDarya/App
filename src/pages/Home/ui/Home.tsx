import { ITodo } from "@/shared/types/itemTodo";
import { TodoItem } from "@/shared/ui/TodoItem";
import styles from "./Home.module.scss";
import { useMemo } from "react";

interface IProps {
  list: ITodo[];
  deleteTodo: (id: string | number) => void;
}

function Home({ list, deleteTodo }: IProps) {
  if (!list.length) {
    return (
      <div className={styles.home}>
        <h1>Not Found List !!!</h1>
      </div>
    );
  }

  const listElement = useMemo(
    () =>
      list.map((el) => (
        <TodoItem item={el} key={el.id} deleteTodo={deleteTodo} />
      )),
    [list]
  );

  return (
    <div className={styles.home}>
      <div className={styles.listBlock}>{listElement}</div>
    </div>
  );
}

export default Home;

