import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestCollectorModule } from './features/test-collector/test-collector.module';
import { CollectorModule } from './services/collector/collector.module';
import { SchedulerModule } from './services/scheduler/scheduler.module';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), TestCollectorModule, SchedulerModule, CollectorModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
