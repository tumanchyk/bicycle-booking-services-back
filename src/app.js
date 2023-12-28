const express = require('express');
const cors = require('cors');

const bodyParser = require("body-parser");
const { getAllBicycles, createBicycle, deleteBicycle, getBicyclesStatistic, updateBicycleStatus, getBicyclesByStatus } = require('./controllers/bicycleController');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/bicycles", getAllBicycles);
app.get("/bicycles-list", getBicyclesByStatus);
app.get("/statistic", getBicyclesStatistic);
app.post("/bicycles", createBicycle);
app.put("/bicycles/:id", updateBicycleStatus)
app.delete("/bicycles/:id", deleteBicycle);

module.exports = app;