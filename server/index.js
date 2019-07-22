'use strict';

const express = require('express');
const path = require('path');

const app = express();

const rootDir = path.resolve(__dirname, '..', 'dist');

app.use(express.static(rootDir));

const port = process.env.PORT || 8080;

app.listen(port);