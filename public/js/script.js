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
    const addUserBtn = document.getElementById('addUserBtn');
    const addUserModal = document.getElementById('addUserModal');
    const closeModal = document.querySelector('.close');
    const addUserForm = document.getElementById('addUserForm');
    const userTableBody = document.querySelector('.user-table tbody');

    // Ouvrir la modale
    addUserBtn.addEventListener('click', () => {
        addUserModal.style.display = 'flex';
    });

    // Fermer la modale
    closeModal.addEventListener('click', () => {
        addUserModal.style.display = 'none';
    });

    // Soumission du formulaire
    addUserForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Récupérer les valeurs du formulaire
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const role = document.getElementById('role').value;

        // Générer un nouvel ID (id auto-incrémental basé sur le nombre de lignes)
        const newId = userTableBody.rows.length + 1;

        // Ajouter une nouvelle ligne dans la table
        const newRow = document.createElement('tr');
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

        // Réinitialiser le formulaire
        addUserForm.reset();

        // Fermer la modale
        addUserModal.style.display = 'none';
    });

    // Fermer la modale si on clique en dehors
    window.addEventListener('click', (e) => {
        if (e.target === addUserModal) {
            addUserModal.style.display = 'none';
        }
    });
});

