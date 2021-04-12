import { IsNotEmpty, IsInt, Min } from 'class-validator';

export class AddressRequestDto {
    @IsNotEmpty({
        message: 'Street cannot be empty.',
    })
    street: string;

    @IsNotEmpty({
        message: 'Area cannot be empty.',
    })
    area: string;

    @IsNotEmpty({
        message: 'City cannot be empty.',
    })
    city: string;

    @IsInt()
    @Min(1, {
        message: 'Postal code cannot be empty',
    })
    postalCode: number;



    constructor(street: string, area: string, city: string, postalCode: number) {
        this.street = street;
        this.area = area;
        this.city = city;
        this.postalCode = postalCode;
    }
}
