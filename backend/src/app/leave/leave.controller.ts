import {
    Controller,
    Post,
    Body,
    Get,
    UseGuards,
    Request,
    UnauthorizedException,
  } from '@nestjs/common';
  import { LeaveService } from './leave.service';
  import { JwtAuthGuard } from '../auth/jwt-auth.guard';
  import { CreateLeaveRequestDto } from './create-leave-request.dto';
  import { Request as ExpressRequest } from 'express'; 
  
  @Controller('leave')
  export class LeaveController {
    constructor(private readonly leaveService: LeaveService) {}
  
    @Post('requests')
    @UseGuards(JwtAuthGuard)
    async createLeaveRequest(
      @Body() createLeaveRequestDto: CreateLeaveRequestDto,
      @Request() req: ExpressRequest,
    ) {
      const userId = req.user?.uuid
      if (!userId) {
        throw new UnauthorizedException('Utilisateur non authentifié');
      }
    
      return this.leaveService.createLeaveRequest(createLeaveRequestDto, userId);
    }
  
    @Get('requests')
    @UseGuards(JwtAuthGuard)
    async getLeaveRequests(@Request() req: ExpressRequest) { 
      const userId =req.user.uuid 
      return this.leaveService.getLeaveRequestsByUser(userId);
    }
  }