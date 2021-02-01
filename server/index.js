import express from 'express';
import bodyParser from 'body-parser';
import usersRoutes from './Routes/usersRoutes.js';
import recordRoute from './Routes/recordRoutes.js';


const app = express();
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: false }));
app.use('/', usersRoutes);
app.use('/',recordRoute);


const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=>console.log(`[!]: Server is Running on Port ${PORT}`));