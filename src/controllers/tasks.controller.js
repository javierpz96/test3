const pool = require("../db");

const balanceActual = async (req, res) => {
  const sumatoria = await pool.query("SELECT SUM(ingreso) from alke");
  res.json(sumatoria.rows[0]);
};

const eliminarAll = async (req, res) => {
  const eliminarTudo = await pool.query("DELETE FROM alke");
};

const egresoTotal = async (req, res) => {
  const restoria = await pool.query("SELECT SUM(egreso) from alke");
  res.json(restoria.rows[0]);
};

const movimientos = async (req, res) => {
  try {
    const allMovimientos = await pool.query("SELECT * FROM alke");
    res.json(allMovimientos.rows);
  } catch (error) {
    next(error);
  }
};

const ingreso = async (req, res) => {
  const { ingreso, egreso, fecha } = req.body;

  const result = await pool.query(
    "INSERT INTO alke (ingreso,egreso,fecha) VALUES($1,$2,$3) RETURNING *",
    [ingreso, egreso, fecha]
  );

  res.json(result.rows[0]);
};

const egreso = async (req, res) => {
  const { egreso } = req.body;

  const result = await pool.query(
    "INSERT INTO alke (egreso) VALUES($1) RETURNING *",
    [egreso]
  );

  res.json(result.rows[0]);
};

const deleteIngreso = async (req, res) => {
  const { id } = req.params;
  
  const result = await pool.query(
    "DELETE FROM alke WHERE id = $1 RETURNING *",
    [id]
  );

  if (result.rowCount === 0)
    return res.status(404).json({
      message: "tarea no encontrada, no se puede eliminar",
    });

  return res.sendStatus(204);
};

const edit = async (req, res) => {
  try {
    const { id } = req.params;
    const { ingreso, egreso, fecha } = req.body;

    const result = await pool.query(
      "UPDATE alke SET ingreso = $1, egreso = $2, fecha = $3 WHERE id = $4",
      [ingreso, egreso, fecha, id]
    );

    if (result.rows.length === 0)
      return res.status(404).json({
        message: "No existe tal tarea",
      });

    return res.json(result.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
};

const obtenerMovimiento = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query("SELECT * from alke WHERE id = $1", [id]);
    if (result.rows.length === 0)
      return res.status(404).json({
        message: "movimiento no encontrada",
      });
    return res.json(result.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  balanceActual,
  ingreso,
  egreso,
  edit,
  movimientos,
  deleteIngreso,
  obtenerMovimiento,
  egresoTotal,
  eliminarAll,
};
