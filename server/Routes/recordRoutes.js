import express from 'express';
import recordControllers from '../controllers/recordControllers.js';


const recordRoute = express.Router();
//Getting all records
recordRoute.post('/records',recordControllers.createRecord);
recordRoute.get('/records',recordControllers.getRecords);
recordRoute.get('/records/:id',recordControllers.getSingleRecord);


export default recordRoute;