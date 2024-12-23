const express = require('express');
const axios = require('axios');
const checklistConditions = require('./checklistRules'); // Import checklist rules

const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

// Function to evaluate checklist conditions
const evaluateConditions = (data) => {
    return checklistConditions.map(condition => ({
    name: condition.name,
    passed: condition.check(data),
    }));
};

// Route to fetch data and evaluate conditions
app.get('/', async (req, res) => {
try {
    const response = await axios.get('http://qa-gb.api.dynamatix.com:3100/api/applications/getApplicationById/67339ae56d5231c1a2c63639');
    const data = response.data;

    const results = evaluateConditions(data);

    res.render('index', { results });
    } catch (error) {
    res.status(500).send('Error fetching data');
    }
});

// Start the server
app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
