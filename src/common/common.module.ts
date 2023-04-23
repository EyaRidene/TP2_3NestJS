import { Global, Module } from '@nestjs/common';
import { v4 as uuid } from 'uuid';

export const Provide_Tokens = { uuid: 'UUID' };
const uuidProvider = {
  useValue: uuid,
  provide: Provide_Tokens.uuid,
};

@Global()
@Module({
  providers: [uuidProvider],
  exports: [uuidProvider],
})
export class CommonModule {}
