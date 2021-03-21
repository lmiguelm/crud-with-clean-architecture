import { container } from 'tsyringe';
import { IEncoderProvider } from './IEnconderProvider';
import { BcryptEncoder } from './implementations/BcryptEncoder';

container.registerSingleton<IEncoderProvider>('IEncoderProvider', BcryptEncoder);
