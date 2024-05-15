import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'interest' })
export class Interest {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column({ type: 'varchar', length: 40 })
  interest: string;
}
