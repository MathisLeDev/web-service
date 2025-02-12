import { BaseEntity, Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ArticleEntity } from "./article.entity";

@Entity("payments")
export class PaymentEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_name: string;

    @ManyToOne(() => ArticleEntity, (article) => article.payments, { onDelete: "CASCADE" })
    @JoinColumn({ name: "article_id" })
    article: ArticleEntity;

    @Column({ type: "enum", enum: ["processing", "processed"], default: "processing" })
    status: string;
}
