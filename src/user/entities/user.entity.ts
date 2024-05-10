import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  email: string;

  @Column({ type: 'varchar' })
  ID: string;

  @Column({ type: 'varchar' })
  nickname: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  passwordCheck: string;

  @Column({ type: 'varchar' })
  interests: string;
}
