export class CreateUserDto {
    readonly id: string;
    readonly name: string;
    readonly surname: string;
    readonly patronimic: string;
    readonly email: string;
    readonly password: string;
    readonly role: string;
}