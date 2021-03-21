import { container } from 'tsyringe';
import { IEncoder } from './IEnconder';
import { BcryptEncoder } from './implementations/BcryptEncoder';

container.registerSingleton<IEncoder>('Encoder', BcryptEncoder);
