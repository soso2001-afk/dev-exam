import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Put,
    Delete,
    NotFoundException,
  } from '@nestjs/common';
  import { UsersService } from './users.service';
import { CreateUserDto, UserResponseDto } from './user.dto';

  
  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    @Post()
    async create(@Body() createUserDto: CreateUserDto): Promise<UserResponseDto> {
      return this.usersService.create(createUserDto);
    }
  
    @Get()
    async findAll(): Promise<UserResponseDto[]> {
      return this.usersService.findAll();
    }
  
    @Get(':uuid')
    async findOne(@Param('uuid') uuid: string): Promise<UserResponseDto> {
      return this.usersService.findOne(uuid);
    }
  
    @Put(':uuid')
    async update(
      @Param('uuid') uuid: string,
      @Body() updateUserDto: CreateUserDto,
    ): Promise<UserResponseDto> {
      return this.usersService.update(uuid, updateUserDto);
    }
  
    @Delete(':uuid')
    async remove(@Param('uuid') uuid: string): Promise<void> {
      return this.usersService.remove(uuid);
    }
  }