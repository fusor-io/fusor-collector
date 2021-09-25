import { HttpService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { HubClientService } from './hub-client.service';

describe('HubClientService', () => {
  let service: HubClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        HubClientService,
        { provide: HttpService, useValue: {} },
        { provide: ConfigService, useValue: { get: jest.fn() } },
      ],
    }).compile();
    service = module.get<HubClientService>(HubClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
