import { Test, TestingModule } from '@nestjs/testing';
import { TablePipeService } from './table-pipe.service';

describe('TablePipeService', () => {
  let service: TablePipeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TablePipeService],
    }).compile();

    service = module.get<TablePipeService>(TablePipeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
