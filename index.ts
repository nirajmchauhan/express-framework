import 'reflect-metadata';
import express, { Express, Router } from 'express';
import cookieParser from 'cookie-parser';
import { container } from 'tsyringe';
import { Routes } from './src/routes';
import { AddressController } from './src/controllers/addressController';

const app = express();
app.use(cookieParser());
app.use(express.json());

const router = Router();


const initRoutes = (app: Express) => {
    const addressController = container.resolve(AddressController);
    new Routes(addressController).init(router);
    app.use('/api/v1', router);
}

const init = () => {
    initRoutes(app);
    console.log("Server started on port 3000");
}

app.listen(3000, init);