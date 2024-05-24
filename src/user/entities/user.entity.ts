import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 45, comment: '이메일', nullable: true })
  email: string;

  @Column({ type: 'varchar', length: 40, comment: '닉네임' })
  nickname: string;

  @Column({ type: 'varchar', length: 45, comment: '비밀번호', nullable: true })
  password: string;

  @Column({ type: 'double', comment: '카카오 아이디', nullable: true })
  kakao_id: number;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '프로필 이미지',
    default: '',
    nullable: true,
  })
  profile_image: string;

  @Column({
    type: 'varchar',
    length: 255,
    comment: '프로필 배경사진',
    default: '',
    nullable: true,
  })
  thumbnail_image: string;

  @Column({
    type: 'varchar',
    length: 20,
    comment: '연령대',
    nullable: true,
  })
  age_range: string;

  @Column({
    type: 'varchar',
    length: 20,
    comment: '성별',
    nullable: true,
  })
  gender: string;
}
