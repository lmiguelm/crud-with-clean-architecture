import { Connection, createConnection } from 'typeorm';
import typeormConfig from '../../../../ormconfig';

export default async function (): Promise<Connection> {
  return await createConnection(typeormConfig);
}
