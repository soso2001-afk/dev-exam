import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LeaveService } from './leave.service';
import { LeaveController } from './leave.controller';
import { LeaveRequest } from './leave-request.entity';
import { User } from '../users/user.entity';


@Module({
  imports: [TypeOrmModule.forFeature([LeaveRequest, User])],
  controllers: [LeaveController],
  providers: [LeaveService],
})
export class LeaveModule {}