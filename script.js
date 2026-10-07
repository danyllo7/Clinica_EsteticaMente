'use strict';
const menuButton = document.querySelector('.menu');
const navigation = document.querySelector('.navlinks');
if (menuButton && navigation) {
 const closeMenu = () => { navigation.classList.remove('open'); menuButton.setAttribute('aria-expanded', 'false'); menuButton.textContent = 'Menu'; };
 menuButton.addEventListener('click', () => { const open = navigation.classList.toggle('open'); menuButton.setAttribute('aria-expanded', String(open)); menuButton.textContent = open ? 'Fechar' : 'Menu'; });
 navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
 document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
}
const filters = document.querySelectorAll('.filter');
function filterTreatments(category) {
 filters.forEach(button => button.setAttribute('aria-pressed', String(button.dataset.filter === category)));
 document.querySelectorAll('.treatment').forEach(card => { card.hidden = category !== 'all' && card.dataset.category !== category; });
 const count = document.querySelector('#treatment-count');
 if (count) count.textContent = `${document.querySelectorAll('.treatment:not([hidden])').length} tratamentos apresentados`;
}
filters.forEach(button => button.addEventListener('click', () => filterTreatments(button.dataset.filter)));
document.querySelectorAll('[data-area]').forEach(link => link.addEventListener('click', () => filterTreatments(link.dataset.area)));
const form = document.querySelector('#booking-form');
if (form) form.addEventListener('submit', event => {
 event.preventDefault();
 if (!form.reportValidity()) return;
 const name = form.elements.namedItem('name').value.trim();
 const specialty = form.elements.namedItem('specialty').value;
 const message = `Olá, Clínica EsteticaMente!${name ? ` O meu nome é ${name}.` : ''} Gostaria de pedir uma consulta de ${specialty}. Podem indicar-me a disponibilidade?`;
 const url = `https://wa.me/351964624361?text=${encodeURIComponent(message)}`;
 const opened = window.open(url, '_blank', 'noopener,noreferrer');
 const status = document.querySelector('#form-status');
 status.replaceChildren();
 const text = document.createTextNode('Envie a mensagem no WhatsApp para pedir a consulta. Se não abriu, ');
 const fallback = document.createElement('a'); fallback.href = url; fallback.target = '_blank'; fallback.rel = 'noopener noreferrer'; fallback.textContent = 'clique aqui'; fallback.style.textDecoration = 'underline';
 status.append(text, fallback);
});
