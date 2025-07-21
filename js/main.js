
// Form submission handling
document.getElementById('tourBookingForm').addEventListener('submit', function (e) {
    e.preventDefault();

    // Get form values
    const tour = document.getElementById('tourSelect').value;
    const adults = document.getElementById('adults').value;
    const children = document.getElementById('children').value;
    const infants = document.getElementById('infants').value;
    const date = document.querySelector('input[type="date"]').value;

    const foodOption = document.getElementById('foodOption').checked;
    const transportOption = document.getElementById('transportOption').checked;
    const insuranceOption = document.getElementById('insuranceOption').checked;

    const specialRequests = document.getElementById('specialRequests').value;

    // Simple validation
    if (!tour) {
        alert('Please select a tour');
        return;
    }

    if (!date) {
        alert('Please select a date');
        return;
    }

    // Calculate prices - simplified
    let basePrice = 0;
    switch (tour) {
        case 'mountain': basePrice = 450; break;
        case 'coastal': basePrice = 320; break;
        case 'safari': basePrice = 1200; break;
    }

    // Show confirmation (in a real app, this would be sent to backend)
    alert(`Booking request submitted!\n\nTour: ${tour}\nAdults: ${adults}\nChildren: ${children}\nInfants: ${infants}\nDate: ${date}\n\nWe'll contact you shortly to confirm your booking.`);

    // Reset form
    this.reset();
    document.getElementById('adults').value = 1;
    document.getElementById('children').value = 0;
    document.getElementById('infants').value = 0;
});

// Tab switching functionality for tour categories
const tabButtons = document.querySelectorAll('#tours button:not(.active-tab)');
tabButtons.forEach(button => {
    button.addEventListener('click', function () {
        // Remove active class from all buttons
        document.querySelector('#tours .active-tab').classList.remove('active-tab');
        // Add active class to clicked button
        this.classList.add('active-tab');

        // In a real app, we would filter tour cards here
        console.log(`Filtering tours by: ${this.textContent}`);
    });
});
