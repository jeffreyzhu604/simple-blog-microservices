const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { randomBytes } = require('crypto');
const axios = require('axios');

const app = express();
app.use(cors());
// If user sends json data in the body request it actually gets parsed,
// so it shows up correctly in the request handler.
app.use(bodyParser.json());

const posts = {};

app.get('/posts', (req, res) => {
    res.send(posts);
});

app.post('/posts', async (req, res) => {
    const id = randomBytes(4).toString('hex');
    const { title } = req.body;
    posts[id] = {
        id, title
    };

    // Once user creates sends a POST request, emit an event
    await axios.post('http://localhost:4005/events', {
        type: 'PostCreated',
        data: {
            id: id,
            title
        }
    });

    // Status code 201 indicates we created a resource
    res.status(201).send(posts[id]);
});   

app.post('/events', (req, res) => {
    console.log('Received event ', req.body.type);
    res.send({});
});

app.listen(4000, () => {
    console.log('Listening on port 4000');
})