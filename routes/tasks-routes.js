import { Router } from "express";
import TasksService from "../services/tasks-service.js";

const router = Router();
const tasksService = new TasksService();

router.get("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = tasksService.getTaskById(id);
    res.json(result);
  } catch (err) {
    console.error(`Erro ao buscar tarefa: ${err.message}`);
    next(err);
  }
});

router.post("/add", async (req, res, next) => {
  try {
    const task = req.body;
    const result = tasksService.createTask(task);
    res.json(result);
  } catch (err) {
    console.error(`Erro ao criar tarefa: ${err.message}`);
    next(err);
  }
});

router.put("/done/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = tasksService.doneTask(id);
    res.json(result);
  } catch (err) {
    console.error(`Erro ao marcar tarefa como feita: ${err.message}`);
    next(err);
  }
});

router.delete("/delete/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = tasksService.deleteTask(id);
    res.json(result);
  } catch (err) {
    console.error(`Erro ao deletar tarefa: ${err.message}`);
    next(err);
  }
});

export default router;
