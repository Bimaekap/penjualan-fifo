import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreateUserDto {
    @IsString()
    @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
    name: string;

    @IsEmail({}, { message: 'Email tidak valid' })
    @IsNotEmpty({ message: 'Email tidak boleh kosong' })
    email: string;
}
