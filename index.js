const express  = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
dotenv.config();
const app = express()
const routes = require('./routes/routes')

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;
app.use('/api', routes);

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});