const families = {
    "Familia Rivera Acosta": [
        "Manuel", "Pancho Viejo", "Marielos", "Zulema", "Ángel"
    ],
    "Familia Rivera Cervantes": [
        "Carlos", "Carlitos", "Paty", "Ana"
    ],
    "Familia Rivera Santillanes": [
        "Pedro", "Perla", "Uziel", "Arisa", "Siara"
    ],
    "Familia Aris": [
        "Arisbel", "Chayo", "Gelo", "Victor"
    ],    
    "Foraneos": [
        "Panchito", "Miguel", "Daniela"
    ]
};

// Contenedor principal
const familiesContainer = document.getElementById("families-container");

// URL base de tu API en Render
const API_URL = "https://intercambio-page.onrender.com/wishes";

// Variable para almacenar los deseos cargados
let wishesData = {};

// Renderizar familias
function renderFamilies() {
    familiesContainer.innerHTML = ""; // Limpiar contenido previo

    // Recorremos todas las familias
    for (const [familyName, members] of Object.entries(families)) {
        const familySection = document.createElement("section");
        familySection.classList.add("family-section");

        // Título de la familia
        const familyTitle = document.createElement("h2");
        familyTitle.textContent = familyName;
        familySection.appendChild(familyTitle);

        // Contenedor de la fila de miembros
        const familyRow = document.createElement("div");
        familyRow.classList.add("family-row");

        // Crear tarjeta para cada miembro de la familia
        members.forEach(member => {
            const personCard = document.createElement("div");
            personCard.classList.add("person-card");

            // Obtener los deseos del miembro de la API (usamos los datos cargados previamente)
            const wishes = wishesData[member] || [];

            personCard.innerHTML = `
                <h3>${member}</h3>
                <ul>
                    ${wishes
                        .map((wish, index) => `
                            <li>
                                ${renderWish(wish)}
                                <button class="delete-button" onclick="removeWish('${member}', ${index})">❌</button>
                            </li>
                        `)
                        .join("")}
                </ul>
                <input type="text" placeholder="Nuevo deseo" class="wish-input">
                <button onclick="addWish('${member}', this)">Agregar</button>
            `;
            familyRow.appendChild(personCard);
        });

        familySection.appendChild(familyRow);
        familiesContainer.appendChild(familySection);
    }
}

// Renderizar deseos con hipervínculos
function renderWish(wish) {
    const urlPattern = /^(https?:\/\/|www\.|[a-z0-9]+\.[a-z]{2,})/i;
    if (urlPattern.test(wish)) {
        let url = wish;
        if (!wish.startsWith("http://") && !wish.startsWith("https://")) {
            url = `https://${wish}`;
        }
        return `<a href="${url}" target="_blank">${wish}</a>`;
    }
    return wish;
}

// Agregar un nuevo deseo a la API
function addWish(member, button) {
    const input = button.previousElementSibling;  // Obtén el campo de texto
    const wish = input.value.trim();  // Toma el valor del input

    if (wish) {
        const requestData = { member, wish };

        fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestData)
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            loadWishes();  // Vuelve a cargar los deseos con los nuevos datos
        })
        .catch(error => {
            console.error("Error al agregar el deseo:", error);
        });
    } else {
        alert("Por favor, escribe un deseo.");
    }
}

// Eliminar un deseo de la API
function removeWish(member, index) {
    const deleteUrl = `${API_URL}/${member}/${index}`;

    fetch(deleteUrl, { method: 'DELETE' })
        .then(response => response.json())
        .then(data => {
            console.log(data.message);
            loadWishes();  // Vuelve a cargar los deseos después de eliminar
        })
        .catch(error => {
            console.error("Error al eliminar el deseo:", error);
        });
}

// Cargar los deseos desde la API una sola vez
function loadWishes() {
    fetch(API_URL)
        .then(response => response.json())
        .then(data => {
            console.log("Datos cargados desde la API:", data);
            wishesData = data;  // Guardar los datos de deseos globalmente
            renderFamilies();  // Vuelve a renderizar las familias con los deseos
        })
        .catch(error => {
            console.error("Error al cargar los deseos:", error);
        });
}

// Llamada para cargar los datos al inicio
loadWishes();

// Configuración de partículas (NO SE HA ELIMINADO)
particlesJS("particles-js", {
    particles: {
        number: { value: 100, density: { enable: true, value_area: 800 } },
        shape: { type: "circle", stroke: { width: 0, color: "#fff" } },
        color: { value: "#ffcc00" },
        opacity: { value: 0.5, random: true, anim: { enable: true, speed: 1, opacity_min: 0.1, sync: false } },
        size: { value: 5, random: true },
        line_linked: { enable: false },
        move: { enable: true, speed: 2, direction: "none", random: true, straight: false, out_mode: "out", bounce: false }
    },
    interactivity: {
        detect_on: "canvas",
        events: {
            onhover: { enable: true, mode: "repulse" },
            onclick: { enable: true, mode: "push" }
        }
    }
});

