import connection from "../database.js";

class TasksService {
  getTasks() {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM tasks", (error, results, fields) => {
        if (error) {
          reject(error);
        } else {
          resolve([results, fields]);
        }
      });
    });
  }

  getTaskById(id) {
    const result = connection.query(`SELECT * FROM tasks WHERE id = ?`, [id]);

    return result[0];
  }

  createTask(task) {
    try {
      const result = connection.query(`INSERT INTO tasks (title, description, due_date) VALUES (?, ?, ?)`, [task.title, task.description, task.due_date]);

      if (result) {
        return {
          message: "Tarefa criada com sucesso",
          status: 201,
        };
      } else {
        throw new Error("Erro ao criar tarefa", result);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }

  deleteTask(id) {
    try {
      const result = connection.query(`DELETE FROM tasks WHERE id = ?`, [id]);

      if (result) {
        return {
          message: "Tarefa deletada com sucesso",
          status: 200,
        };
      } else {
        throw new Error("Erro ao deletar tarefa", result);
      }
    } catch (error) {
      throw new Error(error.message);
    }
  }
}

export default TasksService;
