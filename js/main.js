// main.js optimizado con doble envío de correo y menú móvil animado
document.addEventListener('DOMContentLoaded', function () {

    /* ===== Menú móvil con animación ===== */
    const toggleBtn = document.getElementById("menuToggle");
    const mobileMenu = document.getElementById("mobileMenu");

    if (toggleBtn && mobileMenu) {
        toggleBtn.addEventListener("click", function () {
            if (mobileMenu.classList.contains("hidden")) {
                mobileMenu.classList.remove("hidden");
                mobileMenu.classList.add("animate-slide-down");
                mobileMenu.classList.remove("animate-slide-up");
            } else {
                mobileMenu.classList.add("animate-slide-up");
                setTimeout(() => {
                    mobileMenu.classList.add("hidden");
                    mobileMenu.classList.remove("animate-slide-down");
                }, 300);
            }
        });
    }

    /* ===== Tabs de tours ===== */
    const tabButtons = document.querySelectorAll('#tours button');
    const tourCards = document.querySelectorAll('.tour-card');

    tabButtons.forEach(button => {
        button.addEventListener('click', function () {
            tabButtons.forEach(btn => btn.classList.remove('active-tab', 'text-blue-600', 'font-bold'));
            this.classList.add('active-tab', 'text-blue-600', 'font-bold');

            const selectedCategory = this.textContent.trim();
            tourCards.forEach(card => {
                const label = card.querySelector('span')?.textContent.trim();
                card.classList.toggle('hidden', !(selectedCategory === 'All Tours' || selectedCategory === label));
            });
        });
    });

    /* ===== Formulario de reservas ===== */
    const bookingForm = document.getElementById('tourBookingForm');
    if (bookingForm) {
        bookingForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const tour = document.getElementById('tourSelect').value;
            const adults = parseInt(document.getElementById('adults').value);
            const children = parseInt(document.getElementById('children').value);
            const date = document.querySelector('input[type="date"]').value;
            const food = document.getElementById('foodOption').checked;
            const transport = document.getElementById('transportOption').checked;
            const specialRequests = document.getElementById('specialRequests').value;
            const extras = `${food ? "Meals, " : ""}${transport ? "Transport, " : ""}`;

            // Campos del usuario
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;

            if (!tour) return alert('Please select a tour.');
            if (!date) return alert('Please select a date.');
            if (adults < 1) return alert('At least one adult is required.');

            let basePrice = 0;
            switch (tour) {
                case 'mountain': basePrice = 450; break;
                case 'coastal': basePrice = 99; break;
                case 'safari': basePrice = 79; break;
            }

            const peopleCount = adults + children;
            let total = basePrice * adults + (basePrice * 0.5 * children);
            if (food) total += 25 * peopleCount;
            if (transport) total += 50 * peopleCount;
            

            /* ===== Enviar correo al usuario ===== */
            const userParams = {
                to_name: name,
                to_email: email,
                tour,
                date,
                adults,
                children,
                extras,
                total: total.toFixed(2)
            };

            emailjs.send('service_5dxg27h', 'template_5bwkgbp', userParams)
                .then(() => {
                    console.log("Correo enviado al usuario");
                }).catch(err => {
                    console.error("Error al enviar al usuario:", err);
                });

            /* ===== Enviar correo al guía ===== */
            const guideParams = {
                customer_name: name,
                customer_email: email,
                tour,
                date,
                adults,
                children,
                extras,
                total: total.toFixed(2)
            };

            emailjs.send('service_5dxg27h', 'template_68ew5ln', guideParams)
                .then(() => {
                    alert("Reserva enviada. Revisa tu correo para confirmación.");
                }).catch(err => {
                    console.error("Error al enviar al guía:", err);
                    alert("Ocurrió un error enviando la reserva.");
                });

            // Reset del formulario
            this.reset();
            document.getElementById('adults').value = 1;
            document.getElementById('children').value = 0;
            document.getElementById('infants').value = 0;
        });
    }
});
