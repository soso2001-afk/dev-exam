import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module'; 
import { User } from './users/user.entity';
import { Role } from './users/role.entity';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
   
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '', 
      database: 'gestion_conges',
      entities: [User, Role], 
      synchronize: true, 
    }),
   
    UsersModule,
    AuthModule
  ],
  controllers: [AppController], 
  providers: [AppService], 
})
export class AppModule {}