import { Module } from '@nestjs/common';

import { HubClientModule } from '../hub-client';
import { ConfiguratorService } from './service/configurator.service';

@Module({
  imports: [HubClientModule],
  providers: [ConfiguratorService],
  exports: [ConfiguratorService],
})
export class ConfiguratorModule {}
