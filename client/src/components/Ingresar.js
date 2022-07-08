import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Ingresar = () => {
  //Estados
  const [ingreso, setIngreso] = useState({
    ingreso: "0",
    fecha: "",
    egreso: "0",
  });
  const [editing, setEditing] = useState(false);
  const navigate = useNavigate();
  const params = useParams();

  const handleChange = (e) => {
    setIngreso({
      ...ingreso,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editing) {
      const response = await fetch(
        `http://localhost:5000/movimientos/${params.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(ingreso),
        }
      );
      const data = await response.json();
    } else {
      await fetch("http://localhost:5000/ingreso", {
        method: "POST",
        body: JSON.stringify(ingreso),
        headers: {
          "Content-Type": "application/json",
        },
      });
    }
    navigate("/");
  };

  //Funcion

  const loadMovimiento = async (id) => {
    const res = await fetch(`http://localhost:5000/movimientos/${id}`);
    const data = await res.json();
    setIngreso({
      ingreso: data.ingreso,
      fecha: data.fecha,
      egreso: data.egreso,
    });
    setEditing(true);
  };

  ///--------------------------------

  useEffect(() => {
    if (params.id) {
      loadMovimiento(params.id);
    }
  }, [params.id]);

  return (
    <div className="h-screen w-2/6 mx-auto mt-20">
      <form onSubmit={handleSubmit}>
        <div className="mb-6"></div>

        <div className="mb-6">
          <label
            for="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Income
          </label>
          <input
            value={ingreso.ingreso}
            name="ingreso"
            onChange={handleChange}
            type="text"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          ></input>
        </div>
        <div className="mb-6">
          <label
            for="password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Expense
          </label>
          <input
            value={ingreso.egreso}
            name="egreso"
            onChange={handleChange}
            type="text"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          ></input>
        </div>
        <div className="mb-6">
          <label
            for="repeat-password"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            Date
          </label>
          <input
            value={ingreso.fecha}
            name="fecha"
            onChange={handleChange}
            type="date"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
            required
          ></input>
        </div>
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="terms"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800"
              required
            ></input>
          </div>
          <label
            for="terms"
            className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
          >
            I'm sure of the{" "}
            <a
              href="#"
              className="text-blue-600 hover:underline dark:text-blue-500"
            >
              terms and Conditions
            </a>
          </label>
        </div>
        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default Ingresar;
