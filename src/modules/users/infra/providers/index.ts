import { container } from 'tsyringe';
import { JwtProvider } from './token/implementations/JwtProvider';
import { ITokenProvider } from './token/ITokenProvider';

container.registerSingleton<ITokenProvider>('TokenProvider', JwtProvider);
