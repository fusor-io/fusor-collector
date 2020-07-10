import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly _appService: AppService) {}

  @Get()
  async getHello() {
    return this._appService.getHello();
  }
}
