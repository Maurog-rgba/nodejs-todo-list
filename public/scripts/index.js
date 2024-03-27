document.addEventListener("DOMContentLoaded", async () => {
  const deleteButtons = document.querySelectorAll(".delete");

  deleteButtons.forEach((button) => {
    const taskId = button.getAttribute("data-id");
    button.addEventListener("click", async () => {
      const response = await fetch(`/tasks/delete/${taskId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        window.location.reload();
      }
    });
  });

  // Botão de adicionar tarefa
  var addButton = document.getElementById("add-task-button");
  // Modal
  var modal = document.getElementById("modal");
  // Botão de fechar modal
  var closeButton = modal.querySelector(".close");

  // Adiciona evento de clique ao botão de adicionar tarefa
  addButton.addEventListener("click", function () {
    // Exibe o modal
    modal.style.display = "block";
  });

  // Adiciona evento de clique ao botão de fechar modal
  closeButton.addEventListener("click", function () {
    // Fecha o modal
    modal.style.display = "none";
  });

  // Fecha o modal quando o usuário clicar fora dele
  window.addEventListener("click", function (event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});

function addTask() {
  const task = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    due_date: document.getElementById("due_date").value,
  };

  fetch("/tasks/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  })
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        window.location.reload();
      }
    });
}
