import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'categoria' })
export class Category {
  @PrimaryGeneratedColumn({ name: 'categoria_id' })
  categoriaId: number;

  @Column({ name: 'nome_categoria', length: 20, nullable: true })
  nomeCategoria?: string;

  @Column({ name: 'descricao_categoria', length: 200, nullable: true })
  descricaoCategoria?: string;
}
