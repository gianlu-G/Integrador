/*document.addEventListener("DOMContentLoaded", function (event) {
    let container = document.getElementById("ToDo");
    
});

function EditTitle () {
    let title = document.getElementById('title');
    title.removeAttribute('readonly');
    
    let iconedit = document.getElementById('icon-edit');
    iconedit.style.display = "none";

    let iconsave = document.getElementById('icon-save');
    iconsave.style.display = "block";
}*/
document.addEventListener("DOMContentLoaded", function (event) {
    let addButton = document.querySelector("button");
    let titleInput = document.getElementById("titulo");
    let containers = document.querySelectorAll(".container.section");
    let currentContainerIndex = 0;

    addButton.addEventListener("click", function () {
        // Obtén el valor del título introducido por el usuario
        const newTitle = titleInput.value;

        // Crea un nuevo div para contener el título y su bloque de elementos
        const newTitleDiv = createTitleDiv(newTitle);

        // Agrega el nuevo div al contenedor "Por Hacer" (posición inicial)
        containers[currentContainerIndex].appendChild(newTitleDiv);

        // Restablece el valor del campo de entrada de texto
        titleInput.value = "";
    });

    function createTitleDiv(title) {
        // Crea un nuevo div para contener el título y su bloque de elementos
        const newTitleDiv = document.createElement("div");
        newTitleDiv.className = "card";

        // Crea el ícono de edición (lápiz) para el título
        const iconEdit = document.createElement("i");
        iconEdit.className = "fa-solid fa-pen";

        // Crea un elemento de entrada de texto para mostrar el título
        const titleInputDiv = document.createElement("input");
        titleInputDiv.className = "title-readonly";
        titleInputDiv.type = "text";
        titleInputDiv.readOnly = true;
        titleInputDiv.value = title;

        // Crea un bloque de elementos con sus propios botones
        const elementsBlock = createElementsBlock();

        // Agrega los elementos al nuevo div
        newTitleDiv.appendChild(iconEdit);
        newTitleDiv.appendChild(titleInputDiv);
        newTitleDiv.appendChild(elementsBlock);

        // Agrega un manejador de eventos al ícono de edición para habilitar la edición del título
        iconEdit.addEventListener("click", function () {
            titleInputDiv.readOnly = false;
            titleInputDiv.focus();
        });

        return newTitleDiv;
    }

    function createElementsBlock() {
        // Crea un bloque de elementos que incluye los botones
        const elementsBlock = document.createElement("div");
        elementsBlock.style.display = "inline-flex";
        elementsBlock.style.width = "100%";

        const iconSave = createIcon("fa-solid fa-floppy-disk", "save");
        const iconDelete = createIcon("fa-solid fa-xmark", "delete");
        const iconLeft = createArrow("fa-solid fa-circle-chevron-left", "left");
        const iconRight = createArrow("fa-solid fa-circle-chevron-right", "right");

        // Agrega los elementos al bloque
        elementsBlock.appendChild(iconSave);
        elementsBlock.appendChild(iconDelete);
        elementsBlock.appendChild(iconLeft);
        elementsBlock.appendChild(iconRight);

        return elementsBlock;
    }

    function createIcon(className, action) {
        // Crea un ícono con un evento de acción
        const icon = document.createElement("i");
        icon.className = className;

        icon.addEventListener("click", function () {
            handleAction(action);
        });

        return icon;
    }

    function createArrow(className, direction) {
        // Crea un ícono de flecha
        const icon = document.createElement("i");
        icon.className = className;

        icon.addEventListener("click", function () {
            moveTitle(direction);
        });

        return icon;
    }

    function handleAction(action) {
        // Agregar lógica para las acciones de los botones (guardar, eliminar, etc.)
        // Puedes implementar estas acciones según tus requisitos
        if (action === "save") {
            // Lógica para guardar
        } else if (action === "delete") {
            // Lógica para eliminar
        }
    }

    function moveTitle(direction) {
        // Obtiene el contenedor actual y el siguiente
        const currentContainer = containers[currentContainerIndex];
        let nextContainerIndex = currentContainerIndex;

        if (direction === "left" && currentContainerIndex > 0) {
            // Mover hacia la izquierda
            nextContainerIndex = currentContainerIndex - 1;
        } else if (direction === "right" && currentContainerIndex < containers.length - 1) {
            // Mover hacia la derecha
            nextContainerIndex = currentContainerIndex + 1;
        }

        const nextContainer = containers[nextContainerIndex];

        // Mueve el título al siguiente contenedor
        const titles = currentContainer.querySelectorAll(".card");
        if (titles.length > 0) {
            const titleToMove = titles[titles.length - 1];
            nextContainer.appendChild(titleToMove);
        }

        // Actualiza el índice del contenedor actual
        currentContainerIndex = nextContainerIndex;
    }
});
function agregarTitulo() {
    const tituloInput = document.getElementById('titulo');
    const nuevoTitulo = tituloInput.value;

    if (nuevoTitulo) {
        // Llama a una función para guardar el nuevo título en un archivo JSON
        guardarTituloEnJSON(nuevoTitulo);

        // Limpia el input
        tituloInput.value = '';
    }
}

function guardarTituloEnJSON(titulo) {
    // Crea un objeto que contendrá el título
    const tituloObjeto = {
        titulo: titulo
    };

    // Convierte el objeto a JSON
    const tituloJSON = JSON.stringify(tituloObjeto);

    // Aquí puedes enviar el JSON al servidor y guardarlo en un archivo
    // Puedes utilizar una solicitud POST o una biblioteca como fetch para enviar los datos.

    // Ejemplo de cómo enviar el JSON al servidor utilizando fetch
    fetch('/guardar-titulo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: tituloJSON
    })
    .then(response => response.json())
    .then(data => {
        console.log(data.message);
    })
    .catch(error => {
        console.error('Error:', error);
    });
}