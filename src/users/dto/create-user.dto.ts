import { IsEmail, IsNotEmpty, IsString, IsStrongPassword, MinLength } from "class-validator";

export class CreateUserDto {

    @IsString()
    @IsNotEmpty({ message: 'Username tidak boleh kosong' })
    username: string;

    @IsString()
    @IsNotEmpty({ message: 'Nama tidak boleh kosong' })
    name: string;

    @IsEmail({}, { message: 'Email tidak valid' })
    @IsNotEmpty({ message: 'Email tidak boleh kosong' })
    email: string;

    @IsNotEmpty({ message: 'Password tidak boleh kosong' })
    @IsStrongPassword({
        minLength: 6,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 1,
    }
    , { message: 'Password harus mengandung minimal 1 huruf kecil, 1 huruf besar, 1 angka, dan 1 simbol' })
    @MinLength(6, { message: 'Password minimal 6 karakter' })
    password: string;

    @IsString()
    role: string;
}
