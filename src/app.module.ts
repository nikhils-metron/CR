import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './modules/auth/auth.module';
import { ApiModule } from './modules/api/api.module';

@Module({
  imports: [AuthModule, ApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
