import { BrowserRouter } from "react-router-dom";
import "./App.css";
import { AppRouter } from "./routes/AppRouter";

function App() {
  return (
    // Envoltorio que permite navegar sin recargar la página
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}

export default App;
