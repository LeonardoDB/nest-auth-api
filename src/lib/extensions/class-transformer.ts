import { plainToInstance } from 'class-transformer';
import { ClassConstructor, ClassTransformOptions } from 'class-transformer/types/interfaces';

export function partialPlainToInstance<T>(
  instanceClass: ClassConstructor<T>,
  plain: Partial<T>,
  options?: ClassTransformOptions,
): T {
  return plainToInstance(instanceClass, plain, options);
}
