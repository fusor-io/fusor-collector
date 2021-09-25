import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';

import { HubClientService } from '../../hub-client/service/hub-client.service';
import { ConfiguratorService } from './configurator.service';

describe('ConfiguratorService', () => {
  let service: ConfiguratorService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ConfiguratorService,
        { provide: HubClientService, useValue: {} },
        { provide: ConfigService, useValue: { get: jest.fn() } },
      ],
    }).compile();
    service = module.get<ConfiguratorService>(ConfiguratorService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
