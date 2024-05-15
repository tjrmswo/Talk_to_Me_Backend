import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 45, comment: '이메일' })
  email: string;

  @Column({ type: 'varchar', length: 40, comment: '닉네임' })
  nickname: string;

  @Column({ type: 'varchar', length: 45, comment: '비밀번호' })
  password: string;
}
