const families = {
    "Familia Rivera Acosta": [
        "Manuel", "Miguel", "Panchito", "Pancho Viejo", "Marielos", "Zulema", "Ángel"
    ],
    "Familia Rivera Cervantes": [
        "Carlos", "Carlitos", "Paty", "Ana"
    ],
    "Familia Rivera Santillanes": [
        "Pedro", "Perla", "Uziel", "Arisa", "Siara"
    ],
    "Familia Aris": [
        "Arisbel", "Chayo", "Gelo", "Victor"
    ]
};

const API_URL = "http://127.0.0.1:5000"; // Cambia esta URL cuando despliegues tu API

let wishesData = {};

// Cargar deseos desde la API
async function loadWishesFromAPI() {
    const response = await fetch(`${API_URL}/wishes`);
    wishesData = await response.json();
    renderFamilies();
}

// Agregar deseo a la API
async function addWish(member, button) {
    const input = button.previousElementSibling;
    const wish = input.value.trim();

    if (wish) {
        await fetch(`${API_URL}/wishes`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ member, wish })
        });
        input.value = ""; // Limpiar el campo de entrada
        loadWishesFromAPI(); // Recargar los deseos desde la API
    } else {
        alert("Por favor, escribe un deseo.");
    }
}

// Eliminar deseo desde la API
async function removeWish(member, index) {
    await fetch(`${API_URL}/wishes/${member}/${index}`, {
        method: "DELETE"
    });
    loadWishesFromAPI(); // Recargar los deseos desde la API
}

// Renderizar familias y deseos (sin cambios)
function renderFamilies() {
    const familiesContainer = document.getElementById("families-container");
    familiesContainer.innerHTML = ""; // Limpiar contenido previo

    for (const [familyName, members] of Object.entries(families)) {
        const familySection = document.createElement("section");
        familySection.classList.add("family-section");

        const familyTitle = document.createElement("h2");
        familyTitle.textContent = familyName;
        familySection.appendChild(familyTitle);

        const familyRow = document.createElement("div");
        familyRow.classList.add("family-row");

        members.forEach(member => {
            const personCard = document.createElement("div");
            personCard.classList.add("person-card");

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

// Renderizar deseos con hipervínculos (sin cambios)
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

// Inicializar
loadWishesFromAPI();



particlesJS("particles-js", {
    particles: {
        number: { value: 150, density: { enable: true, value_area: 800 } },
        shape: { type: "image", image: { src: "https://img.icons8.com/emoji/48/snowflake.png", width: 48, height: 48 } },
        size: { value: 8, random: true },
        move: { speed: 1, random: true },
        opacity: { value: 0.7, random: true }
    }
});

