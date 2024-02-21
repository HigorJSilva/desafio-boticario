import { Client } from '../entities/client.entity';

export type ProtectedClient = Omit<Client, 'senha'>;
