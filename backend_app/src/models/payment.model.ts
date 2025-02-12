import {PaymentDto} from "../dtos/payment.dto";
import {PaymentEntity} from "../entities/payment.entity";

export class PaymentModel {
    constructor() {
    }

    async createPayment(payment: PaymentDto) {
        try {
            return PaymentEntity.create({user_name: payment.user_name, article:{id:payment.article_id}}).save();
        } catch (error) {
            throw error;
        }
    }

    async updatePayment(payment: PaymentEntity) {
        try {
            return PaymentEntity.update(payment.id, {status: payment.status});
        } catch (error) {
            throw error;
        }
    }

    async getPayments(): Promise<PaymentEntity[]> {
        try {
            return await PaymentEntity.find({relations: ["article"]});
        } catch (error) {
            throw error;
        }
    }
}
