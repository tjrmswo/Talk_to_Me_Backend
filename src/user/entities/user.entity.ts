import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  email: string;

  @Column({ type: 'varchar', length: 45 })
  ID: string;

  @Column({ type: 'varchar', length: 40 })
  nickname: string;

  @Column({ type: 'varchar', length: 45 })
  password: string;

  @Column({ type: 'varchar', length: 45 })
  passwordCheck: string;

  @Column({ type: 'varchar', length: 255 })
  interests: string;
}
