import { memo, useCallback, useMemo, useState } from "react";
import { Home } from "./pages/Home";
import { Button, Input } from "antd";
import styles from "./App.module.scss";
import { TodoFormModal } from "./entities/TodoForm";
import { useContextHook } from "./shared/hooks/useContextHook";
import { ITodo, TODOS_LOCAL_STORAGE } from "./shared/types/itemTodo";

export const getLocalTodos = (): ITodo[] => {
  const data = localStorage.getItem(TODOS_LOCAL_STORAGE);

  return data ? [...JSON.parse(data)] : [];
};

function App() {
  const [todos, setTodos] = useState<Array<ITodo>>(() => getLocalTodos());

  const [search, setSearch] = useState<string>("");

  const [sortedTodo, setSortedTodo] = useState<"title" | "desc" | "">("");

  const searchInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  }, []);

  const searchTodo = useMemo(() => {
    return todos.filter(
      (el) =>
        el.title.toLowerCase().includes(search.toLowerCase().trim()) ||
        el.desc.toLowerCase().includes(search.toLowerCase().trim())
    );
  }, [search, todos]);

  const filterSortedTodo = useMemo(() => {
    if (sortedTodo) {
      return [...searchTodo].sort((a, b) => a[sortedTodo].localeCompare(b[sortedTodo]))
    }

    return searchTodo
  }, [searchTodo, sortedTodo])
  
  const { showModal } = useContextHook();

  const addTodo = useCallback(
    (data: ITodo) => {
      setTodos((prev) => [...prev, data]);
      localStorage.setItem(
        TODOS_LOCAL_STORAGE,
        JSON.stringify([...todos, data])
      );
    },
    [todos]
  );

  const deleteTodo = useCallback(
    (id: string | number) => {
      const filterTodos = todos.filter((el) => el.id !== id);

      setTodos(filterTodos);
      localStorage.setItem(TODOS_LOCAL_STORAGE, JSON.stringify(filterTodos));
    },
    [todos]
  );

  return (
    <div className="container">
      <div style={{display: "flex", justifyContent: "center"}}>
      <Button style={{width: "500px"}} className={styles.btnModal} type="primary" onClick={showModal}>
        Add New Todo
      </Button>
      </div>
      <div style={{display: "flex", justifyContent: "center"}}>
      <div style={{ margin: "50px 0px 0px", padding: "13px" }}>
        <Input
        style={{width: "400px"}}
          placeholder="Search todos..."
          value={search}
          onChange={searchInput}
        />
      </div>
      {/* <div style={{ margin: "50px 0px 0px", padding: "13px" }}>
        <Button>Moon</Button>
      </div> */}
      </div>

      <div style={{ margin: "10px", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <select
        style={{width: "200px", padding: "10px"}}
          value={sortedTodo}
          onChange={(e) => setSortedTodo(e.target.value as "title" | "desc" | "")}
          >
          <option disabled value="">sorted</option>
          <option value="title">title</option>
          <option value="desc">description</option>
        </select>
      </div>

      <Home list={filterSortedTodo} deleteTodo={deleteTodo} />
      <TodoFormModal addTodo={addTodo} />
    </div>
  );
}

export default memo(App);
