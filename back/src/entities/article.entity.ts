import {BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {PaymentEntity} from "./payment.entity";

@Entity()
export class ArticleEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    content: string;

    @OneToMany(() => PaymentEntity, (payment) => payment.article)
    payments: PaymentEntity[]
}