import { Controller, Get } from '@nestjs/common';

import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly _appService: AppService) {}

  @Get()
  async healthCheck(): Promise<Record<string, string>> {
    return this._appService.healthCheck();
  }

  @Get('/reload')
  async reload(): Promise<void> {
    return this._appService.reload();
  }
}
