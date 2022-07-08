import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavBar from "./components/Navbar";
import Movimientos from "./components/Movimientos";
import Ingresar from "./components/Ingresar";
import { MovimientosProvider } from "./context/MovimientoConext";

const App = () => {
  return (
    <MovimientosProvider>
      <BrowserRouter>
        <NavBar />
        <Routes>
          <Route path="/" element={<Movimientos />}></Route>
          <Route path="/Ingresar/new" element={<Ingresar />}></Route>
          <Route path="/movimientos/:id/edit" element={<Ingresar />}></Route>
        </Routes>
      </BrowserRouter>
    </MovimientosProvider>
  );
};

export default App;
