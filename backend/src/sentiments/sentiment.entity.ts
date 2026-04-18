import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

/**
 * Sentiment entity — maps directly to the 'sentiments' SQLite table.
 *
 * Mirrors the frontend Sentiment interface:
 *   { id, rating, comment, createdAt }
 */
@Entity('sentiments')
export class Sentiment {
  /** Auto-incremented integer PK (mapped to string on the API surface) */
  @PrimaryGeneratedColumn()
  id: number;

  /** Rating value — must be 1–5 (enforced at DTO level) */
  @Column({ type: 'integer' })
  rating: number;

  /** Optional user comment */
  @Column({ type: 'text', default: '' })
  comment: string;

  /** Timestamp set once at creation — never updated */
  @CreateDateColumn()
  createdAt: Date;
}
