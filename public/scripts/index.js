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

  var addButton = document.getElementById("add-task-button");
  var modal = document.getElementById("modal");
  var closeButton = modal.querySelector(".close");

  addButton.addEventListener("click", function () {
    modal.style.display = "block";
  });

  closeButton.addEventListener("click", function () {
    modal.style.display = "none";
  });

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
