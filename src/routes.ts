import { Router } from 'express';
import { injectable } from 'tsyringe';
import { AddressController } from './controllers/addressController';

@injectable()
export class Routes {
    private readonly addressController: AddressController;

    constructor(addressController: AddressController) {
        this.addressController = addressController;
    }

    init(router: Router) {
        router.post('/address', this.addressController.createAddress.bind(this.addressController));
        router.get('/address/:id', this.addressController.getAddressById.bind(this.addressController));
    }


}