const dropdowns = document.querySelectorAll('.dropdown');

function closeDropdown(dropdown) {
    dropdown.classList.remove('is-open');
    dropdown.querySelector('.dropdown-toggle').setAttribute('aria-expanded', 'false');
}

dropdowns.forEach((dropdown) => {
    const toggle = dropdown.querySelector('.dropdown-toggle');

    toggle.addEventListener('click', () => {
        const isOpen = dropdown.classList.contains('is-open');

        dropdowns.forEach(closeDropdown);
        if (!isOpen) {
            dropdown.classList.add('is-open');
            toggle.setAttribute('aria-expanded', 'true');
        }
    });
});

document.addEventListener('click', (event) => {
    if (!event.target.closest('.dropdown')) {
        dropdowns.forEach(closeDropdown);
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        dropdowns.forEach(closeDropdown);
    }
});
