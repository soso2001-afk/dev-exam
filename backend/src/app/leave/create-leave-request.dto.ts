import { IsDateString, IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateLeaveRequestDto {
  @IsDateString()
  @IsNotEmpty()
  startDate!:string;

  @IsDateString()
  @IsNotEmpty()
  endDate!:string;

  @IsString()
  @IsNotEmpty()
  type!:string;

  @IsString()
  @IsOptional()
  comments?: string;
}