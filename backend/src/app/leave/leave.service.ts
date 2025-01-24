import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { LeaveRequest } from './leave-request.entity';
import { User } from '../users/user.entity';
import { CreateLeaveRequestDto } from './create-leave-request.dto';


@Injectable()
export class LeaveService {
  constructor(
    @InjectRepository(LeaveRequest)
    private readonly leaveRequestRepository: Repository<LeaveRequest>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}


  async createLeaveRequest(
    createLeaveRequestDto: CreateLeaveRequestDto,
    userId: string,
  ): Promise<LeaveRequest> {
    const user = await this.userRepository.findOne({ where: {uuid:userId } });
    if (!user) {
      throw new NotFoundException('Utilisateur non trouvé');
    }

    const leaveRequest = this.leaveRequestRepository.create({
      ...createLeaveRequestDto,
      user,
    });

    return this.leaveRequestRepository.save(leaveRequest);
  }


  async getLeaveRequestsByUser(userId: string): Promise<LeaveRequest[]> {
    return this.leaveRequestRepository.find({
      where: { user:  {uuid:userId }},
      relations: ['user'],
    });
  }
}