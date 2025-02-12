import {ArticleModel} from "../models/article.model";
import {Request, Response, NextFunction} from "express";
import {ArticleEntity} from "../entities/article.entity";
import {ArticleDto} from "../dtos/article.dto";
import {PaymentModel} from "../models/payment.model";

export class PaymentController {
    _paymentModel = new PaymentModel();

    constructor() {
    }

    async createPayment(request: Request, response: Response, next: NextFunction) {
        try {
            request.body;
            const payment = request.body;
            if(!payment?.article_id || !payment?.user_name){
                response.status(400).json({message: "No payment provided"});
            }
            const newPayment = this._paymentModel.createPayment(payment);
            if(!newPayment){
                response.status(400).json({message: "Payment not created"});
            }
            response.status(201).json(newPayment);
        } catch (error) {
            next(error);
        }
    }

}