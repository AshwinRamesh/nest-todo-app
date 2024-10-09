import { Module } from '@nestjs/common';
import { FlagsLocalService } from './service/flags.local.service';

@Module({
  providers: [FlagsLocalService], // TODO need to make this into a DI based on env.
  exports: [FlagsLocalService]
})
export class FlagsModule {}
