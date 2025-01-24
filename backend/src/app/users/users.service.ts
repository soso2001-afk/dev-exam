import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { Role } from './role.entity';
import { CreateUserDto, UserResponseDto } from './user.dto';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}
  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const role = await this.roleRepository.findOne({
      where: { uuid: createUserDto.roleId },
    });
    if (!role) {
      throw new NotFoundException('Role not found');
    }

    const user = this.userRepository.create({
      name: createUserDto.name,
      email: createUserDto.email,
      passwordHash: createUserDto.passwordHash,
      role,
    });

    const savedUser = await this.userRepository.save(user);

    return {
      uuid: savedUser.uuid,
      name: savedUser.name,
      email: savedUser.email,
      role: {
        uuid: savedUser.role.uuid,
        name: savedUser.role.name,
      },
    };
  }

  // Trouver tous les utilisateurs
  async findAll(): Promise<UserResponseDto[]> {
    const users = await this.userRepository.find({ relations: ['role'] });
    return users.map((user) => ({
      uuid: user.uuid,
      name: user.name,
      email: user.email,
      role: {
        uuid: user.role.uuid,
        name: user.role.name,
      },
    }));
  }

  // Trouver un utilisateur par son UUID
  async findOne(uuid: string): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({
      where: { uuid },
      relations: ['role'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    // Mapper l'entité User vers UserResponseDto
    return {
      uuid: user.uuid,
      name: user.name,
      email: user.email,
      role: {
        uuid: user.role.uuid,
        name: user.role.name,
      },
    };
  }

  // Mettre à jour un utilisateur
  async update(uuid: string, updateUserDto: CreateUserDto): Promise<UserResponseDto> {
    const user = await this.userRepository.findOne({
      where: { uuid },
      relations: ['role'],
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (updateUserDto.roleId) {
      const role = await this.roleRepository.findOne({
        where: { uuid: updateUserDto.roleId },
      });
      if (!role) {
        throw new NotFoundException('Role not found');
      }
      user.role = role;
    }

    Object.assign(user, updateUserDto);
    const updatedUser = await this.userRepository.save(user);

    // Mapper l'entité User vers UserResponseDto
    return {
      uuid: updatedUser.uuid,
      name: updatedUser.name,
      email: updatedUser.email,
      role: {
        uuid: updatedUser.role.uuid,
        name: updatedUser.role.name,
      },
    };
  }

  // Supprimer un utilisateur
  async remove(uuid: string): Promise<void> {
    const user = await this.userRepository.findOne({ where: { uuid } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    await this.userRepository.remove(user);
  }
  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findOne({ where: { email }, relations: ['role'] });
  }
}