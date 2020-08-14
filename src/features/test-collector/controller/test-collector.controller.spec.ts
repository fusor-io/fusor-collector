import { Test, TestingModule } from '@nestjs/testing';
import { TestCollectorController } from './test-collector.controller';

describe('TestCollector Controller', () => {
  let controller: TestCollectorController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TestCollectorController],
    }).compile();

    controller = module.get<TestCollectorController>(TestCollectorController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
