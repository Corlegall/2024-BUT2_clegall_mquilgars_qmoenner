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


// page produit disponibilité date

// Prix par jour
const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Middleware pour parser JSON
app.use(bodyParser.json());

// Données fictives de disponibilités
const unavailableDates = [
    { start: "2024-11-25", end: "2024-11-30" }
];

// Vérifie les disponibilités
app.post('/api/checkAvailability', (req, res) => {
    const { startDate, endDate } = req.body;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start) || isNaN(end) || end < start) {
        return res.status(400).json({ message: "Dates invalides." });
    }

    const isUnavailable = unavailableDates.some(dateRange => {
        const rangeStart = new Date(dateRange.start);
        const rangeEnd = new Date(dateRange.end);
        return (start <= rangeEnd && end >= rangeStart);
    });

    res.json({ isAvailable: !isUnavailable });
});

// Démarrage du serveur
app.listen(3000, () => {
    console.log('Serveur démarré sur le port 3000');
});



// page produit annulation réservation

const rentals = [
    { id: 1, product: "Tapis de course RUN500", startDate: "2024-12-01", endDate: "2024-12-15", price: 179.8 },
    { id: 2, product: "Vélo elliptique", startDate: "2024-11-15", endDate: "2024-11-30", price: 89.9 },
];

app.post('/api/cancelRental', (req, res) => {
    const { rentalId } = req.body;

    const rentalIndex = rentals.findIndex(r => r.id === rentalId);

    if (rentalIndex === -1) {
        return res.status(404).json({ message: "Location introuvable." });
    }

    const rental = rentals[rentalIndex];
    const now = new Date();
    const startDate = new Date(rental.startDate);

    if (startDate <= now) {
        return res.status(400).json({ message: "Cette location ne peut pas être annulée, car elle a déjà commencé." });
    }

    rentals.splice(rentalIndex, 1); // Supprime la location
    res.json({ message: `La location "${rental.product}" a été annulée.` });
});



app.post('/api/rentals', (req, res) => {
    const { startDate, endDate } = req.body;

    const start = new Date(startDate);
    const end = new Date(endDate);

    if (isNaN(start) || isNaN(end) || end < start) {
        return res.status(400).json({ message: "Dates invalides." });
    }

    const days = (end - start) / (1000 * 60 * 60 * 24) + 1; // Durée en jours
    const dailyPrice = 89.9;
    let totalPrice = dailyPrice * days;

    // Applique une réduction de 10% si plus de 7 jours
    if (days > 7) {
        totalPrice *= 0.9;
    }

    // Simulation de sauvegarde en base
    const newRental = {
        id: rentals.length + 1,
        product: "Tapis de course RUN500",
        startDate: startDate,
        endDate: endDate,
        price: totalPrice,
    };
    rentals.push(newRental);

    res.json({ message: "Réservation réussie", totalPrice });
});


document.getElementById("rentalForm").addEventListener("submit", async function (e) {
    e.preventDefault();

    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    try {
        const response = await fetch("/api/rentals", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ startDate, endDate }),
        });

        const result = await response.json();

        if (response.ok) {
            alert(`Réservation confirmée ! Prix total : ${result.totalPrice} €`);
        } else {
            alert(result.message || "Une erreur est survenue.");
        }
    } catch (error) {
        console.error("Erreur lors de la réservation :", error);
        alert("Une erreur est survenue.");
    }
});


async function checkAvailability(startDate, endDate) {
    try {
        const response = await fetch('/api/checkAvailability', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ startDate, endDate }),
        });

        const data = await response.json();
        return data.isAvailable;
    } catch (error) {
        console.error('Erreur lors de la vérification de la disponibilité:', error);
        return false;
    }
}
