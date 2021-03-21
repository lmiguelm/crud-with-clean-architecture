import { Connection, createConnection } from 'typeorm';
import typeormConfig from '../../../configs/ormconfig';

export default async function (): Promise<Connection> {
  return await createConnection(typeormConfig);
}
