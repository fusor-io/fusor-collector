import { Test, TestingModule } from '@nestjs/testing';

import { HubClientService } from '../../hub-client/service/hub-client.service';
import { LogLevelManagerService } from './log-level-manager.service';

describe('LogLevelManagerService', () => {
  let service: LogLevelManagerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LogLevelManagerService, { provide: HubClientService, useValue: {} }],
    }).compile();

    service = module.get<LogLevelManagerService>(LogLevelManagerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
