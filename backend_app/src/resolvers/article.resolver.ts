import { ArticleModel } from "../models/article.model";
import { ArticleDto } from "../dtos/article.dto";

export class ArticleResolvers {
    _articleModel = new ArticleModel();

    constructor() {
    }

    async getArticles() {
        return this._articleModel.getArticles();
    }

    async getArticleById({ id }: { id: number }) {
        return this._articleModel.getArticlesById(id);
    }

    async createArticle({ article }: { article: ArticleDto }) {
        return this._articleModel.createArticle(article);
    }

    async updateArticle({ article }: { id: number, article: ArticleDto }) {
        return this._articleModel.updateArticle(article);
    }

    async deleteArticle({ id }: { id: number }) {
        return this._articleModel.deleteArticle(id);
    }
}

export default new ArticleResolvers();
