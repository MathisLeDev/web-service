import {BaseEntity, Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {ArticleEntity} from "./article.entity";

@Entity()
export class PaymentEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_name: string

    @ManyToOne(() => ArticleEntity, (article) => article.payments)
    @JoinColumn({name: "article_id"})
    article: ArticleEntity

    @Column({enum: ["processing", "processed"], default: "processing"} )
    status: string
}