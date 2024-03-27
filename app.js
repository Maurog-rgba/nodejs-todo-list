import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import tasksRoutes from "./routes/tasks-routes.js";
import TasksService from "./services/tasks-service.js";

dotenv.config();

const app = express();
const tasksService = new TasksService();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.static(__dirname));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", async (req, res) => {
  try {
    const tasks = await tasksService.getTasks();
    res.render("index", { tasks });
  } catch (error) {
    console.error("Erro ao listar tarefas:", error);
    res.status(500).send("Erro ao listar tarefas");
  }
});

app.use("/tasks", tasksRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
