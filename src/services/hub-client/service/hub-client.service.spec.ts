import { Test, TestingModule } from '@nestjs/testing';
import { HubClientService } from './hub-client.service';

describe('HubClientService', () => {
  let service: HubClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HubClientService],
    }).compile();

    service = module.get<HubClientService>(HubClientService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
