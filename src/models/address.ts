export class Address {
    id: number;
    street: string;
    area: string;
    city: string;
    postalCode: number;


    constructor(id: number, street: string, area: string, city: string, postalCode: number) {
        this.id = id;
        this.street = street;
        this.area = area;
        this.city = city;
        this.postalCode = postalCode;
    }
}