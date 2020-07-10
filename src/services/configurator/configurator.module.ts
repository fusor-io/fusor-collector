import { Module, HttpModule } from '@nestjs/common';
import { ConfiguratorService } from './service/configurator.service';

@Module({
  imports: [HttpModule],
  providers: [ConfiguratorService],
  exports: [ConfiguratorService],
})
export class ConfiguratorModule {}
