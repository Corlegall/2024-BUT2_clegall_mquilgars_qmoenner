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
const dailyRate = 89.9;

function calculatePrice() {
    const startDate = new Date(document.getElementById("startDate").value);
    const endDate = new Date(document.getElementById("endDate").value);

    // Vérifie si les dates sont valides
    if (startDate && endDate && startDate <= endDate) {
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); // Convertit en jours

        // Calcule le prix prévisionnel
        const totalPrice = (diffDays * dailyRate).toFixed(2);
        document.getElementById("priceOutput").textContent = `${totalPrice} €`;
    } else {
        alert("Veuillez entrer des dates valides.");
    }
}

// Fonction pour vérifier la disponibilité (simulée ici)
function checkAvailability(startDate, endDate) {
    // Simule un appel au serveur pour vérifier les disponibilités
    const unavailableDates = [
        { start: "2024-11-25", end: "2024-11-30" },
    ];

    const isUnavailable = unavailableDates.some(dateRange => {
        const rangeStart = new Date(dateRange.start);
        const rangeEnd = new Date(dateRange.end);
        return (startDate <= rangeEnd && endDate >= rangeStart);
    });

    return !isUnavailable; // Disponible si aucune collision
}

function rentProduct() {
    const startDate = new Date(document.getElementById("startDate").value);
    const endDate = new Date(document.getElementById("endDate").value);

    if (!checkAvailability(startDate, endDate)) {
        alert("Désolé, le produit n'est pas disponible aux dates sélectionnées.");
        return;
    }

    const price = document.getElementById("priceOutput").textContent;
    alert(`Votre réservation est confirmée du ${startDate.toLocaleDateString()} au ${endDate.toLocaleDateString()}. Prix total : ${price}`);
}

async function checkAvailabilityAPI(startDate, endDate) {
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


// page produit annulation réservation

// Simule les locations du client
const rentals = [
    { id: 1, product: "Tapis de course RUN500", startDate: "2024-12-01", endDate: "2024-12-15", price: 179.8 },
    { id: 2, product: "Vélo elliptique", startDate: "2024-11-15", endDate: "2024-11-30", price: 89.9 },
];

function loadRentals() {
    const rentalList = document.getElementById("rentalList");
    rentalList.innerHTML = ""; // Vide la liste avant de la remplir

    rentals.forEach(rental => {
        const now = new Date();
        const startDate = new Date(rental.startDate);

        // Vérifie si la location peut être annulée
        const canCancel = startDate > now;

        const listItem = document.createElement("li");
        listItem.innerHTML = `
            <strong>${rental.product}</strong><br>
            Du ${startDate.toLocaleDateString()} au ${new Date(rental.endDate).toLocaleDateString()}<br>
            Prix : ${rental.price.toFixed(2)} €<br>
            ${canCancel ? `<button onclick="cancelRental(${rental.id})">Annuler</button>` : "<em>Non annulable</em>"}
        `;
        rentalList.appendChild(listItem);
    });
}

// Fonction pour annuler une location
function cancelRental(rentalId) {
    // Recherche la location
    const rental = rentals.find(r => r.id === rentalId);

    if (!rental) {
        alert("Location introuvable.");
        return;
    }

    const now = new Date();
    const startDate = new Date(rental.startDate);

    // Vérifie si la location peut être annulée
    if (startDate <= now) {
        alert("Cette location ne peut pas être annulée, car elle a déjà commencé.");
        return;
    }

    // Simule l'annulation
    alert(`La location du produit "${rental.product}" a été annulée.`);
    // Ici, vous devriez envoyer une requête au serveur pour effectuer l'annulation réelle
    rentals.splice(rentals.indexOf(rental), 1); // Supprime la location localement
    loadRentals(); // Recharge la liste des locations
}

// Charger les locations à l'ouverture de la page
document.addEventListener("DOMContentLoaded", loadRentals);


app.post("/api/cancelRental", async (req, res) => {
    const { rentalId } = req.body;

    // Rechercher la location dans la base de données
    const rental = await Rental.findById(rentalId);

    if (!rental) {
        return res.status(404).json({ message: "Location introuvable" });
    }

    const now = new Date();
    const startDate = new Date(rental.startDate);

    // Vérifier si la location est annulable
    if (startDate <= now) {
        return res.status(400).json({ message: "Cette location ne peut pas être annulée, car elle a déjà commencé." });
    }

    // Annuler la location
    await Rental.deleteOne({ _id: rentalId }); // Supprimer ou marquer comme annulée
    res.json({ message: "Location annulée avec succès" });
});

async function cancelRental(rentalId) {
    try {
        const response = await fetch('/api/cancelRental', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ rentalId }),
        });

        const result = await response.json();
        if (response.ok) {
            alert(result.message);
            rentals.splice(rentals.findIndex(r => r.id === rentalId), 1); // Supprime localement
            loadRentals(); // Recharge la liste
        } else {
            alert(result.message);
        }
    } catch (error) {
        console.error("Erreur lors de l'annulation :", error);
        alert("Une erreur est survenue.");
    }
}
