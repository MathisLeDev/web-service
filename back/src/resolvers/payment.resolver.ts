import {PaymentModel} from "../models/payment.model";
import {PaymentDto} from "../dtos/payment.dto";

export class PurchaseResolvers {
    _paymentModel = new PaymentModel();

    constructor() {
    }

    async purchaseArticle({payment}: { payment: PaymentDto }) {
        return this._paymentModel.createPayment(payment);
    }

}

export default new PurchaseResolvers();
