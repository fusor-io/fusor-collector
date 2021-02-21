import { HttpModule, Module } from '@nestjs/common';

import { HubClientService } from './service/hub-client.service';

@Module({
  imports: [HttpModule],
  providers: [HubClientService],
  exports: [HubClientService],
})
export class HubClientModule {}
