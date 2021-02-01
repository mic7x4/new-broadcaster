import express from 'express';
import recordControllers from '../controllers/recordControllers.js';


const recordRoute = express.Router();
//Getting all records
recordRoute.post('/records',recordControllers.createRecord);
// recordRoute.get('/records',recordControllers.getRecords);


export default recordRoute;