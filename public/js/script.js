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



// Exemple de réservation existante (stockée dans un tableau)
const existingReservations = [
    { start: '2024-12-01', end: '2024-12-10' },
    { start: '2024-12-15', end: '2024-12-20' }
];

// Fonction pour vérifier la disponibilité
function checkAvailability(startDate, endDate) {
    // Parcourir toutes les réservations existantes
    for (const reservation of existingReservations) {
        const reservationStart = new Date(reservation.start);
        const reservationEnd = new Date(reservation.end);

        // Comparer les dates de l'utilisateur avec les réservations existantes
        if (
            (startDate >= reservationStart && startDate <= reservationEnd) || 
            (endDate >= reservationStart && endDate <= reservationEnd) || 
            (startDate <= reservationStart && endDate >= reservationEnd)
        ) {
            return false; // Le produit n'est pas disponible
        }
    }
    return true; // Le produit est disponible
}

// Calcul du prix et vérification de la disponibilité
function calculatePrice() {
    const pricePerMonth = 89.9; // Prix mensuel
    const dailyPrice = pricePerMonth / 30; // Prix par jour
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    // Vérifier si les dates sont valides
    if (!startDate || !endDate) {
        document.getElementById("predictedPrice").textContent = "Prix prévisionnel : 0€";
        document.getElementById("availabilityMessage").textContent = "Le produit est disponible.";
        return;
    }

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (end < start) {
        alert("La date de fin doit être après la date de début.");
        return;
    }

    // Calculer le prix prévisionnel
    const diffTime = end - start;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convertir en jours
    const predictedPrice = (diffDays * dailyPrice).toFixed(2);

    // Vérifier la disponibilité
    if (checkAvailability(start, end)) {
        document.getElementById("availabilityMessage").textContent = "Le produit est disponible.";
        document.getElementById("predictedPrice").textContent = `Prix prévisionnel : ${predictedPrice}€`;
    } else {
        document.getElementById("availabilityMessage").textContent = "Le produit n'est pas disponible pour ces dates.";
        document.getElementById("predictedPrice").textContent = "Prix prévisionnel : 0€";
    }
}

// Fonction pour louer le produit
function rentProduct() {
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    if (!startDate || !endDate) {
        alert("Veuillez sélectionner des dates de début et de fin pour la location.");
        return;
    }

    // Vérifier la disponibilité avant de procéder à la location
    if (checkAvailability(new Date(startDate), new Date(endDate))) {
        alert(`Produit loué du ${startDate} au ${endDate}. Merci pour votre commande !`);
    } else {
        alert("Le produit n'est pas disponible pour ces dates.");
    }
}


