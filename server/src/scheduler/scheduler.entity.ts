import {
  Entity,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Scheduler {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  startHour: string;

  @Column()
  endHour: string;

  @Column({ default: true })
  enabled: boolean;

  @CreateDateColumn()
  createdAt: String;

  @UpdateDateColumn()
  updatedAt: String;
}
