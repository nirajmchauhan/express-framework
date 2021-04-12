import { injectable } from 'tsyringe';
import { Address } from '../models/address';

@injectable()
export class AddressService {

    async create(street: string, area: string, city: string, postalCode: number): Promise<number> {
        return await Promise.resolve(Math.round(Math.random() * 10000));
    }

    async getAddress(id: number): Promise<Address> {
        const _id = await Promise.resolve(Math.round(Math.random() * 10000));
        return new Address(_id, "7th Cross Road", "LBS Nagar", "Bengaluru", 560017);
    }
}