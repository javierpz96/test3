const { Router } = require("express");

const {
  balanceActual,
  ingreso,
  egreso,
  edit,
  movimientos,
  deleteIngreso,
  obtenerMovimiento,
  egresoTotal,
  eliminarAll
  
} = require("../controllers/tasks.controller");

const router = Router();

router.get("/balanceActual", balanceActual);

router.get("/egresoActual", egresoTotal);

router.get("/movimientos/:id",obtenerMovimiento)

router.get("/movimientos",movimientos)

router.post("/ingreso", ingreso);

router.post("/egreso", egreso);

router.delete("/movimientos/:id",deleteIngreso)

router.put("/movimientos/:id", edit);

router.delete("/eliminarTodo",eliminarAll)

module.exports = router;
