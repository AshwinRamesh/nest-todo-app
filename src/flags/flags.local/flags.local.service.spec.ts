import { Test, TestingModule } from '@nestjs/testing';
import { FlagsLocalService } from './flags.local.service';

describe('FlagsLocalService', () => {
  let service: FlagsLocalService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FlagsLocalService],
    }).compile();

    service = module.get<FlagsLocalService>(FlagsLocalService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
