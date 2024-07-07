import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@/styles/main.scss";
import AppContext from "./store/ui/AppContext.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <AppContext>
    <App />
  </AppContext>
);
