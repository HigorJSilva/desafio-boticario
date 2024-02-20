import { Address } from 'src/resources/address/entities/address.entity';
import { Order } from 'src/resources/order/entities/order.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Unique,
  JoinColumn,
  OneToOne,
  OneToMany,
} from 'typeorm';

@Entity({ name: 'cliente' })
@Unique(['cpf'])
export class Client {
  @PrimaryGeneratedColumn({ name: 'cliente_id' })
  clienteId: number;

  @Column({ length: 50, nullable: true })
  email: string;

  @Column({ length: 15, nullable: true })
  username: string;

  @Column({ length: 20, nullable: true })
  senha: string;

  @Column({ length: 200, nullable: false })
  nome: string;

  @Column({ length: 11 })
  cpf: string;

  @Column({ length: 11, nullable: true })
  telefone?: string;

  @Column({ name: 'data_nascimento', type: 'date', nullable: true })
  dataNascimento?: Date;

  @Column({ name: 'endereco_id' })
  enderecoId: number;

  @OneToOne(() => Address, (address) => address.client)
  @JoinColumn({ name: 'endereco_id', referencedColumnName: 'enderecoId' })
  endereco: Address;

  @OneToMany(() => Order, (order) => order.client)
  orders?: Order[];
}
