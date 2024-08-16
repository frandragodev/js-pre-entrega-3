document.getElementById('taskForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita el envío del formulario

    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
        addTask(taskText);
        taskInput.value = ""; // Limpia el campo de entrada
        Swal.fire({
            icon: 'success',
            title: 'Tarea agregada',
            text: 'La tarea fue añadida exitosamente!',
            showConfirmButton: false,
            timer: 1500
        });
    }
});

function addTask(taskText) {
    const taskList = document.getElementById('taskList');
    const listItem = document.createElement('li');
    listItem.className = "mb-2 flex justify-between items-center";

    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;
    listItem.appendChild(taskSpan);

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.className = "mr-2";
    checkbox.addEventListener('change', function () {
        if (checkbox.checked) {
            taskSpan.classList.add('line-through', 'text-gray-500');
        } else {
            taskSpan.classList.remove('line-through', 'text-gray-500');
        }
    });
    listItem.prepend(checkbox);

    const deleteButton = document.createElement('button');
    deleteButton.textContent = "Eliminar";
    deleteButton.className = "bg-red-500 text-white px-2 py-1 rounded";
    deleteButton.addEventListener('click', function () {
        Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, eliminar'
        }).then((result) => {
            if (result.isConfirmed) {
                taskList.removeChild(listItem);
                removeTask(taskText);
                Swal.fire(
                    '¡Eliminado!',
                    'La tarea fue eliminada.',
                    'success'
                );
            }
        });
    });
    listItem.appendChild(deleteButton);

    taskList.appendChild(listItem);

    saveTask(taskText);
}
