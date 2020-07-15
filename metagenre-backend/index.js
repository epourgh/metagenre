const express = require('express'); 
const cors = require('cors'); 
const fetch = require('node-fetch');

const mediums = require('./routes/mediums');
const genres = require('./routes/genres');
const mediumsGenres = require('./routes/mediumsGenres');
const relationships = require('./routes/relationships');
const login = require('./routes/login');
const home = require('./routes/home');
const mediumExtLinks = require('./routes/mediumExternalLinks');
const creatorsSeries = require('./routes/creatorsSeries');
const similar = require('./routes/similar');
const mediumsDetails = require('./routes/mediumsDetails');
const booleansContent = require('./routes/booleans');
const app = express();

app.use(cors());

app.get('/', (req, res) => {
    res.send('Welcome to Metagenre')
});

app.use(mediums);
app.use(genres);
app.use(mediumsGenres);
app.use(relationships);
app.use(login);
app.use(home);
app.use(mediumExtLinks);
app.use(creatorsSeries);
app.use(similar);
app.use(mediumsDetails);
app.use(booleansContent);

/*
    Time Specific Automated Content Updates
*/

contentUpdate = () => {
    fetch(`http://localhost/api/similar`)
        .then(response => response.json())
        .then(response => {
            if (response.data.length > 0) {
                console.log('UPDATED SIMILARS')
            } else {
                console.log('doesn\'t exist');
            }
        })
        .catch(err => console.error(err))
}

// SET EVERY 30 MINS > 
setInterval(function () {
    var hour = new Date().getHours();
    if (hour >= 3 && hour < 4) {
        contentUpdate();
    }
}, 1000 * 10 * 30);

/*
    BACKEND PORT LISTENER
*/

app.listen(4000, () => {
    console.log('running on port 4000')
});