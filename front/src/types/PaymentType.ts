import {ArticleType} from "./ArticleType";

export type PaymentType = {
    id: number
    user_name: string
    article: ArticleType
    status: string
}