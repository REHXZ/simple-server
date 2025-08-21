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

// POST endpoint that logs the entire request body
app.post('/webhook', (req, res) => {
    console.log('--- New POST request received ---');
    console.log('Request URL:', req.url);
    console.log('Request Method:', req.method);
    console.log('Request Headers:', req.headers);
    console.log('Queries:', req.queries)
    console.log(req)
    console.log('----------------------------------');

    // Send a response back
    res.status(200).json({
        message: "Request received successfully",
        receivedData: req.body
    });
});

app.listen(PORT, (error) => {
    if (!error) {
        console.log("Server is Successfully Running, and App is listening on port " + PORT);
    } else {
        console.log("Error occurred, server can't start", error);
    }
});