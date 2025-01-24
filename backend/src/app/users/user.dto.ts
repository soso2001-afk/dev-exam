import { IsNotEmpty, IsString, IsEmail, IsUUID } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  name: string = ''; 

  @IsNotEmpty()
  @IsEmail()
  email: string = '';

  @IsNotEmpty()
  @IsString()
  passwordHash: string = ''; 

  @IsNotEmpty()
  @IsUUID()
  roleId: string = ''; 
}


export class UserResponseDto {
    uuid!:string;
    name!:string;
    email!:string;
    role!:{
      uuid: string;
      name: string;
    };
  }