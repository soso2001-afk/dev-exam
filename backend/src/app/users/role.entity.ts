import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { User } from './user.entity';


@Entity('roles')
export class Role {
    @PrimaryGeneratedColumn('uuid')
    uuid!:string;

  @Column({ type: 'varchar', length: 50, unique: true })
  name!:string

  @OneToMany(() => User, (user) => user.role)
  users!:User[];
}
