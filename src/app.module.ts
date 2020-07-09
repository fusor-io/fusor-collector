import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CollectorModule } from './services/collector/collector.module';
import { SchedulerModule } from './services/scheduler/scheduler.module';

@Module({
  imports: [SchedulerModule, CollectorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
