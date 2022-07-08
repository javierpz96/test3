import { useEffect, useState } from "react";
import { useNavigate} from "react-router-dom";

const Movimientos = () => {
  
  const [movimientos, setMovimientos] = useState([]);
  //---------------
  const [suma, setSuma] = useState({});
  const [resta, setResta] = useState({});
  const navigate = useNavigate();

  // const [select, setSelect] = useState("ingreso");

  // const handleChange = (e) => {
  //   setSelect(e.target.value);
  // };

  const cargarMovimientos = async () => {
    const response = await fetch("http://localhost:5000/movimientos");
    const data = await response.json();
    setMovimientos(data);
  };

  const cargarSumar = async () => {
    const respuesta = await fetch("http://localhost:5000/balanceActual");
    const datubi = await respuesta.json();
    setSuma(datubi);
  };


  const cargarResta = async () => {
    const respuesta = await fetch("http://localhost:5000/egresoActual");
    const data = await respuesta.json();
    setResta(data);
  };


  const eliminarDatos = async () => {
    await fetch("http://localhost:5000/eliminarTodo", {
      method: "DELETE",
    });
    setMovimientos([]);
  };

  //Eliminando datos
  // const handleDelete = async (id,egreso) => {
  //   await fetch(`http://localhost:5000/movimientos/${id}`, {
  //     method: "DELETE",
  //   });
  //   setMovimientosState(movimientos.filter((movimiento) => movimiento.id !== id));

  // };


  useEffect(() => {
    cargarSumar();
  }, [movimientos]);


  useEffect(() => {
    cargarResta();
  }, []);


  useEffect(() => {
    cargarMovimientos();
  }, []);


  return (
    <div className="flex flex-col justify-center items-center  mx-auto mt-10 p-4 w-auto text-center bg-white ">
      <div className="">
        <h5 className="ml-8 mb-2 text-3xl font-mono text-gray-900 dark:text-white">
          The total is:{" "}
          {suma.sum - resta.sum
            ? suma.sum - resta.sum + " 🎉"
            : "there is nothing yet 😪"}
        </h5>
        <p className=" ml-8 text-base text-gray-500 sm:text-lg dark:text-gray-400">
          Result of income and expenses
        </p>
      </div>

      <div className=" p-4  bg-white rounded-lg sm:p-8 dark:bg-gray-800 dark:border-gray-700">
        <h1 className="ml-7 text-center mb-5 text-xl font-bold leading-none text-gray-900 dark:text-white">
          Last moves 🧵
        </h1>

        {movimientos?.slice(0, 10).map((movimiento) => (
          <div key={movimiento.id} className="">
            <div className="ml-4 mb-4 p-4 w-full text-center bg-white rounded-lg border shadow-sm sm:p-8 ">
              <h5 className="mb-2 text-2xl font-mono text-gray-900 dark:text-white">
                Type: {movimiento.ingreso > 0 ? "Income" : "Expense"}
                {movimiento.ingreso & movimiento.egreso ? "/Expense" : ""}
              </h5>

              <h5 className="mb-2 text-2xl font-mono text-gray-900 dark:text-white">
                Income: {movimiento.ingreso}
              </h5>
              <h5 className="mb-2 text-2xl font-mono text-gray-900 dark:text-white">
                Income: {movimiento.egreso}
              </h5>
              <h5 className="mb-2 text-2xl font-mono tracking-tight text-gray-900 dark:text-white">
                Date: {movimiento.fecha?.slice(0, 10)}
              </h5>

              <button
                onClick={() => navigate(`/movimientos/${movimiento.id}/edit`)}
                type="button"
                className="mt-3 focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-1 dark:focus:ring-yellow-900"
              >
                Edit
              </button>
            </div>
          </div>
        ))}
        <a href="/">
          <button
            onClick={() => eliminarDatos()}
            type="button"
            className="ml-9 focus:outline-none text-black bg-red-400 hover:bg-red-600 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-1 dark:focus:ring-yellow-900"
          >
            Delete all
          </button>
        </a>
      </div>
    </div>
  );
};

export default Movimientos;
