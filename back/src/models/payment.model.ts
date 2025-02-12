import {PaymentDto} from "../dtos/payment.dto";
import {PaymentEntity} from "../entities/payment.entity";

export class PaymentModel {
    constructor() {
    }

    async createPayment(payment: PaymentDto) {
        try {
            console.log("debug", payment);
            return PaymentEntity.create({user_name: payment.user_name, article:{id:payment.article_id}}).save();
        } catch (error) {
            throw error;
        }
    }
}
