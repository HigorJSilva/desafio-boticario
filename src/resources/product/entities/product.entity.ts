import { Category } from 'src/resources/category/entities/category.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity({ name: 'produto' })
export class Product {
  @PrimaryGeneratedColumn({ name: 'produto_id' })
  produtoId: number;

  @Column({ name: 'nome_produto', length: 50, nullable: false })
  nomeProduto: string;

  @Column({ name: 'descricao_produto', length: 200, nullable: true })
  descricaoProduto?: string;

  @Column({ name: 'preco_produto', type: 'numeric', nullable: true })
  precoProduto?: number;

  @Column({ name: 'qtd_estoque', type: 'int', nullable: true })
  qtdEstoque?: number;

  @Column({
    name: 'data_cadastro_produto',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  dataCadastroProduto: Date;

  @Column({ name: 'categoria_id', type: 'int', nullable: true })
  categoriaId?: number;

  @ManyToOne(() => Category, (category) => category.products)
  @JoinColumn({ name: 'categoria_id' })
  category: Category;
}
