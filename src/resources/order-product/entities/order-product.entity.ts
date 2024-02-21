import { Order } from 'src/resources/order/entities/order.entity';
import { Product } from 'src/resources/product/entities/product.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
@Entity({ name: 'produto_pedido' })
export class OrderProduct {
  @PrimaryGeneratedColumn({ name: 'produto_pedido_id' })
  produtoPedidoId: number;

  @Column({ name: 'qtd_produto_pedido', type: 'int', nullable: true })
  qtdProdutoPedido?: number;

  @Column({ name: 'preco_produto_pedido', type: 'numeric', nullable: true })
  precoProdutoPedido?: number;

  @Column({ name: 'produto_id', type: 'int' })
  produtoId: number;

  @Column({ name: 'pedido_id', type: 'int' })
  pedidoId: number;

  @ManyToOne(() => Product, (product) => product.orderProducts)
  @JoinColumn({ name: 'produto_id' })
  product?: Product;

  @ManyToOne(() => Order, { nullable: true })
  @JoinColumn({ name: 'pedido_id' })
  order?: Order;
}
