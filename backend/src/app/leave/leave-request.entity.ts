import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { User } from '../users/user.entity';


@Entity('leave_requests')
export class LeaveRequest {
  @PrimaryGeneratedColumn('uuid')
uuid!:string;

  @Column({ type: 'date' })
  startDate!:string;

  @Column({ type: 'date' })
  endDate!:string;

  @Column({ type: 'varchar', length: 50 })
  type!:string; 

  @Column({ type: 'varchar', length: 50, default: 'en attente' })
  status!:string; 

  @Column({ type: 'text', nullable: true })
  comments!:string;

  @ManyToOne(() => User, (user) => user.leaveRequests)
  @JoinColumn({ name: 'user_id' })
  user!:User
}