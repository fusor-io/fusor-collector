import { Test, TestingModule } from '@nestjs/testing';

import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [{ provide: AppService, useValue: { healthCheck: jest.fn() } }],
    }).compile();

    appController = app.get<AppController>(AppController);
    appService = app.get<AppService>(AppService);
  });

  describe('root', () => {
    it('should pass healthCheck', async () => {
      const spy = jest.spyOn(appService, 'healthCheck').mockReturnValue({ status: 'ok' });
      expect(await appController.healthCheck()).toEqual({ status: 'ok' });
      expect(spy).toBeCalled();
    });
  });
});
