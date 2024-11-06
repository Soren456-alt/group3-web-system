const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors()); // Enable CORS for all routes

// Endpoint to receive data and forward to the new webhook URL
app.post('/send-webhook', async (req, res) => {
    const webhookUrl = 'https://webhook.site/8454c921-4614-4d1d-a2b5-9fba56a74474'; // New Webhook URL
    
    console.log('Received data:', req.body); // Log the incoming data
    
    try {
        // Forward request to the new webhook URL
        const response = await axios.post(webhookUrl, req.body, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        res.status(200).json({
            message: 'Data sent to webhook successfully',
            data: response.data,
        });
    } catch (error) {
        console.error('Error sending data to webhook:', error.response ? error.response.data : error.message);
        
        // Check for specific status code for rate limiting
        if (error.response && error.response.status === 429) {
            res.status(429).json({
                message: 'Rate limit exceeded. Please try again later.',
                error: error.response.data,
            });
        } else {
            res.status(500).json({
                message: 'Failed to send data to webhook',
                error: error.response ? error.response.data : error.message,
            });
        }
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Node server is running on http://localhost:${PORT}`);
});
