// page produit, systeme image

let currentImageIndex = 0;
const images = [
    "public/img/tapis-de-course.jpeg",
    "public/img/tapis-de-course-2.jpeg",
    "public/img/tapis-de-course-3.jpeg",
    "public/img/tapis-de-course-4.jpeg",
    "public/img/tapis-de-course-5.jpeg"
];

function changeImage(direction) {
    currentImageIndex += direction;

    // Boucle autour des images
    if (currentImageIndex < 0) {
        currentImageIndex = images.length - 1;
    } else if (currentImageIndex >= images.length) {
        currentImageIndex = 0;
    }

    document.getElementById('mainImage').src = images[currentImageIndex];
}

function setImage(src) {
    currentImageIndex = images.indexOf(src);
    document.getElementById('mainImage').src = src;
}


document.addEventListener('DOMContentLoaded', () => {
    const addButtons = document.querySelectorAll('.btn.add');

    addButtons.forEach((button) => {
        button.addEventListener('click', () => {
            alert('Ajouter un utilisateur : fonctionnalité à implémenter');
        });
    });
});


// page administration

document.addEventListener('DOMContentLoaded', () => {
    const addUserBtn = document.getElementById('addUserBtn');
    const userTableBody = document.getElementById('userTableBody');
    const userModal = document.getElementById('userModal');
    const closeModal = document.querySelector('.close');
    const userForm = document.getElementById('userForm');
    const modalTitle = document.getElementById('modalTitle');
    const userIdInput = document.getElementById('userId');
    const userNameInput = document.getElementById('userName');
    const userEmailInput = document.getElementById('userEmail');
    const userRoleInput = document.getElementById('userRole');

    let editRow = null; // Garde la ligne en cours de modification

    // Ouvrir la modale pour ajouter un utilisateur
    addUserBtn.addEventListener('click', () => {
        modalTitle.textContent = 'Ajouter un utilisateur';
        userIdInput.value = '';
        userNameInput.value = '';
        userEmailInput.value = '';
        userRoleInput.value = 'Utilisateur';
        editRow = null;
        userModal.style.display = 'flex';
    });

    // Fermer la modale
    closeModal.addEventListener('click', () => {
        userModal.style.display = 'none';
    });

    // Ajouter / Modifier un utilisateur
    userForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = userNameInput.value;
        const email = userEmailInput.value;
        const role = userRoleInput.value;

        if (editRow) {
            // Modifier une ligne existante
            editRow.cells[1].textContent = name;
            editRow.cells[2].textContent = email;
            editRow.cells[3].textContent = role;
        } else {
            // Ajouter une nouvelle ligne
            const newRow = document.createElement('tr');
            const newId = userTableBody.rows.length + 1;
            newRow.innerHTML = `
                <td>${newId}</td>
                <td>${name}</td>
                <td>${email}</td>
                <td>${role}</td>
                <td>
                    <button class="btn edit">Modifier</button>
                    <button class="btn delete">Supprimer</button>
                </td>
            `;
            userTableBody.appendChild(newRow);
            attachRowEvents(newRow);
        }

        userModal.style.display = 'none';
    });

    // Supprimer un utilisateur
    userTableBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('delete')) {
            const row = e.target.closest('tr');
            row.remove();
        }
    });

    // Modifier un utilisateur
    const attachRowEvents = (row) => {
        row.querySelector('.edit').addEventListener('click', () => {
            editRow = row;
            modalTitle.textContent = 'Modifier un utilisateur';
            userIdInput.value = row.cells[0].textContent;
            userNameInput.value = row.cells[1].textContent;
            userEmailInput.value = row.cells[2].textContent;
            userRoleInput.value = row.cells[3].textContent;
            userModal.style.display = 'flex';
        });
    };

    document.getElementById('addUserBtn').addEventListener('click', () => {
        const userModal = document.getElementById('userModal');
        const modalTitle = document.getElementById('modalTitle');
        const userIdInput = document.getElementById('userId');
        const userNameInput = document.getElementById('userName');
        const userEmailInput = document.getElementById('userEmail');
        const userRoleInput = document.getElementById('userRole');

        modalTitle.textContent = 'Ajouter un utilisateur';
        userIdInput.value = '';
        userNameInput.value = '';
        userEmailInput.value = '';
        userRoleInput.value = 'Utilisateur';

        userModal.style.display = 'flex'; // Afficher la modale
    });


    // Attacher les événements aux lignes initiales
    document.querySelectorAll('.user-table tbody tr').forEach(attachRowEvents);
});



// Gestion du calcul du prix prévisionnel

function calculatePrice() {
    const pricePerMonth = 89.9; // Prix mensuel
    const dailyPrice = pricePerMonth / 30; // Approximatif, divisé par 30 jours
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    // Vérification de la validité des dates
    if (!startDate || !endDate) {
        document.getElementById("predictedPrice").textContent = "Prix prévisionnel : 0€";
        return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) {
        alert("La date de fin doit être après la date de début.");
        return;
    }

    // Calculer le nombre de jours
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convertir le temps en jours

    // Calculer le prix prévisionnel
    const predictedPrice = (diffDays * dailyPrice).toFixed(2);

    // Afficher le prix prévisionnel
    document.getElementById("predictedPrice").textContent = `Prix prévisionnel : ${predictedPrice}€`;
}

function rentProduct() {
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    if (!startDate || !endDate) {
        alert("Veuillez sélectionner des dates de début et de fin pour la location.");
        return;
    }

    alert(`Produit loué du ${startDate} au ${endDate}. Merci pour votre commande !`);
}



// Backend pour vérifier la disponibilité et finaliser la location

app.post('/check-availability', (req, res) => {
    const { startDate, endDate } = req.body;

    // Exemple : Vérification dans une base de données
    const productId = req.query.productId;
    const isAvailable = checkProductAvailability(productId, startDate, endDate); // Fonction fictive

    res.json({ isAvailable });
});

app.post('/rent-product', (req, res) => {
    const { startDate, endDate, productId } = req.body;

    // Enregistrer la location dans la base de données
    const rental = createRental(productId, startDate, endDate);

    res.json({ success: true, rental });
});


// Connecter le frontend au backend

async function rentProduct() {
    const startDate = document.getElementById('startDate').value;
    const endDate = document.getElementById('endDate').value;

    if (!startDate || !endDate) {
        alert("Veuillez sélectionner des dates pour louer le produit.");
        return;
    }

    const response = await fetch('/check-availability', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ startDate, endDate })
    });

    const data = await response.json();

    if (data.isAvailable) {
        const rentResponse = await fetch('/rent-product', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ startDate, endDate, productId: 1 }) // Exemple d'ID de produit
        });

        const rentData = await rentResponse.json();

        if (rentData.success) {
            alert(`Produit loué avec succès du ${startDate} au ${endDate}.`);
        } else {
            alert("Erreur lors de la location. Veuillez réessayer.");
        }
    } else {
        alert("Le produit n'est pas disponible aux dates demandées.");
    }
}

