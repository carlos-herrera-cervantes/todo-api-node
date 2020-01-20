'use strict';

const dotenv = require('dotenv');
const express = require('express');

const { routes } = require('./Source/Routes/Routes');

dotenv.config();

require('./Source/Config/Seed');

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());

routes(app);

app.listen(port, () => console.log(`Server running at port ${port}`));