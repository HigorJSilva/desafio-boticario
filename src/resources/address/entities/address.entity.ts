import { Client } from 'src/resources/client/entities/client.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'endereco' })
export class Address {
  @PrimaryGeneratedColumn({ name: 'endereco_id' })
  enderecoId: number;

  @Column({ length: 9, nullable: false })
  cep: string;

  @Column({ length: 100, nullable: false })
  rua: string;

  @Column({ length: 30, nullable: true })
  bairro?: string;

  @Column({ length: 30, nullable: false })
  cidade: string;

  @Column({ length: 10, nullable: true })
  numero?: string;

  @Column({ length: 100, nullable: true })
  complemento?: string;

  @Column({ length: 2, nullable: true })
  uf?: string;

  @OneToOne(() => Client, (client) => client.endereco)
  client: Client;
}
