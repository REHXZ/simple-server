const express = require('express');

const app = express();
const PORT = 5000;

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.status(200);
    res.send("This is from root");
});

// POST endpoint that logs both query parameters and request body
app.post('/webhook', (req, res) => {
    console.log('--- New POST request received ---');
    console.log('Request Body:', JSON.stringify(req.body, null, 2));
    console.log('Full URL:', req.protocol + '://' + req.get('host') + req.originalUrl);
    console.log('----------------------------------');

    // Send a response back with the received data
    res.status(200).json({
        message: "Request received successfully",
        queryParameters: req.query,
        bodyData: req.body
    });
});

// Additional GET endpoint to easily test query parameters
app.get('/webhook', (req, res) => {
    console.log('--- New GET request received ---');
    console.log('Request URL:', req.url);
    console.log('Request Method:', req.method);
    console.log('Request Headers:', req.headers);
    console.log('Query Parameters:', req.query);
    console.log('Full URL:', req.protocol + '://' + req.get('host') + req.originalUrl);
    console.log('----------------------------------');

    res.status(200).json({
        message: "GET request received successfully",
        queryParameters: req.query
    });
});

app.listen(PORT, (error) => {
    if (!error) {
        console.log("Server is Successfully Running, and App is listening on port " + PORT);
    } else {
        console.log("Error occurred, server can't start", error);
    }
});