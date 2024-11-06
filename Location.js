// Initialize the map and set view to a default location
var map = L.map('map').setView([51.505, -0.09], 13);

// Load OpenStreetMap tiles
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

// Function to search for a location using the text box input
function searchLocation() {
    var query = document.getElementById('searchBox').value;

    if (query) {
        // Geocoding API to search for the location
        var url = `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`;
        
        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (data.length > 0) {
                    const { lat, lon, display_name } = data[0];

                    // Clear existing markers
                    map.eachLayer(layer => {
                        if (layer instanceof L.Marker) {
                            map.removeLayer(layer);
                        }
                    });

                    map.setView([lat, lon], 13);
                    L.marker([lat, lon]).addTo(map).bindPopup(display_name).openPopup();
                    sendWebhookNotification('Location search: ' + display_name);
                    addNotification('Searched for: ' + display_name); // Add notification for search history
                } else {
                    alert("Location not found!");
                }
            })
            .catch(error => console.log('Error: ', error));
    } else {
        alert("Please enter a location name!");
    }
}

// Function to send a webhook notification
function sendWebhookNotification(action) {
    const nodeServerUrl = 'http://localhost:3000/send-webhook';
    const payload = {
        action: action,
        timestamp: new Date().toISOString(),
    };

    console.log('Sending webhook notification:', payload); // Debugging log

    fetch(nodeServerUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
    .then(response => {
        if (response.ok) {
            console.log('Notification sent successfully');
        } else {
            console.error('Failed to send notification', response.statusText);
        }
    })
    .catch(error => console.error('Error:', error));
}  
