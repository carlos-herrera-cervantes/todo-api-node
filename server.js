'use strict';

const dotenv = require('dotenv');
const express = require('express');

const { configureLanguages } = require('./Source/Middlewares/Language');
const { todoRouter } = require('./Source/Routes/TodoRoutes');
const { userRouter } = require('./Source/Routes/UserRoutes');

dotenv.config();

require('./Source/Config/Context');

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(configureLanguages);
app.use('/api/v1/todos', todoRouter);
app.use('/api/v1/users', userRouter);

app.listen(port, () => console.log(`Server running at port ${port}`));
