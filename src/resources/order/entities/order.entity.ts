import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { Client } from 'src/resources/client/entities/client.entity';
import { OrderProduct } from 'src/resources/order-product/entities/order-product.entity';

@Entity({ name: 'pedido' })
export class Order {
  @PrimaryGeneratedColumn({ name: 'pedido_id' })
  pedidoId: number;

  @Column({ name: 'numero_pedido', type: 'int', nullable: true })
  numeroPedido?: number;

  @Column({ name: 'valor_total_pedido', type: 'numeric', nullable: true })
  valorTotalPedido?: number;

  @Column({
    name: 'data_pedido',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dataPedido: Date;

  @Column({ name: 'status', type: 'bool', nullable: true })
  status?: boolean;

  @Column({ name: 'cliente_id', nullable: false })
  clienteId: number;

  @ManyToOne(() => Client, (client) => client.orders)
  @JoinColumn({ name: 'cliente_id' })
  client: Client;

  @OneToMany(() => OrderProduct, (orderProduct) => orderProduct.order)
  orderProducts?: OrderProduct[];
}
