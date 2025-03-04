const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors()); // Enable CORS

// Default route to confirm server is running
app.get('/', (req, res) => {
    res.send('Sne@ky Pr0xy is running!');
});

// Proxy route
app.get('/proxy', async (req, res) => {
    const { url } = req.query;
    
    // If URL is missing, return an error message
    if (!url) {
        return res.status(400).send('URL is required');
    }

    try {
        // Attempt to fetch the content from the provided URL
        const response = await axios.get(url);
        
        // Send the data back to the frontend
        res.send(response.data);
    } catch (error) {
        // Log the error message for better debugging
        console.error('Error fetching the URL:', error.message);

        // Send the error message to the frontend
        res.status(500).send(`Error fetching the URL: ${error.message}`);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
