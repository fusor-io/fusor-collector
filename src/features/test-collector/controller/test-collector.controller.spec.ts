import { Test, TestingModule } from '@nestjs/testing';

import { CollectorService } from '../../../services/collector/service/collector.service';
import { TestCollectorController } from './test-collector.controller';

describe('TestCollector Controller', () => {
  let controller: TestCollectorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestCollectorController],
      providers: [{ provide: CollectorService, useValue: {} }],
    }).compile();

    controller = module.get<TestCollectorController>(TestCollectorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
