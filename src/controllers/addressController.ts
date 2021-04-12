import { injectable } from 'tsyringe';
import { Request, Response } from 'express';
import { AddressRequestDto } from '../dtos/addressRequestDto';
import { AddressService } from '../services/addressService';
import { ValidateBody } from '../decorators/validateBodyDecorator';
import { RequestBody } from '../decorators/requestBodyDecorator';
import { UserAuth } from '../decorators/userAuthDecorator';

@injectable()
export class AddressController {

    private addressService: AddressService;

    constructor(addressService: AddressService) {
        this.addressService = addressService;
    }

    @UserAuth()
    @ValidateBody(AddressRequestDto)
    @RequestBody(AddressRequestDto)
    async createAddress(req: Request, res: Response) {
        const adddressRequestDto: AddressRequestDto = req.body;
        const id = await this.addressService.create(adddressRequestDto.street, adddressRequestDto.area, adddressRequestDto.city, adddressRequestDto.postalCode);
        res.status(201);
        res.json({ id });
    }

    async getAddressById(req: Request, res: Response) {
        const addressId = Number(req.params.id);
        const address = await this.addressService.getAddress(addressId);
        res.json(address);
    }

}