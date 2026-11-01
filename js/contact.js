// 1. GPS Location Function
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
            const userLat = position.coords.latitude;
            const userLng = position.coords.longitude;
            
            // Redirect to Google Maps Directions
            // Replace '7.5,37.8' with the exact Latitude/Longitude of your shop in Hossana
            const shopCoords = "7.5500,37.8500"; 
            const mapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${userLat},${userLng}&destination=${shopCoords}&travelmode=driving`;
            
            window.open(mapsUrl, '_blank');
        }, () => {
            alert("Unable to find your location. Opening default maps...");
            window.open("https://goo.gl/maps/HossanaLocationLink", '_blank');
        });
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

// 2. Form Handling
function handleContact(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const message = document.getElementById('message').value;

    // Simulate sending (you can connect this to an email service like EmailJS later)
    alert(`Thank you ${name}! Your message has been sent to the Hossana Furniture team. We will reply shortly.`);
    
    document.getElementById('contactForm').reset();
}