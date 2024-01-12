import { Reflector } from '@nestjs/core';

export const FunctionRequired = Reflector.createDecorator<string>();