const express = require('express');
const app = express();
const port = 3000;
const router = require('./src/routes');
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:3001'
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(router)

app.listen(port, () => {
    console.log('Listening on port', port)
});
