const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Allow all domains to make requests
app.use(cors());

app.get('/', (req, res) => {
    res.send('Sne@ky Pr0xy is running!');
});

app.get('/proxy', async (req, res) => {
    const { url } = req.query;

    if (!url) {
        return res.status(400).send('URL is required');
    }

    try {
        console.log(`Fetching: ${url}`);
        const response = await axios.get(url);
        res.send(response.data);
    } catch (error) {
        console.error('Error fetching the URL:', error.message);
        res.status(500).send(`Error fetching the URL: ${error.message}`);
    }
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
