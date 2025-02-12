import {ArticleEntity} from "../entities/article.entity";
import {ArticleDto} from "../dtos/article.dto";
import {DeleteResult} from "typeorm";

export class ArticleModel {
    constructor() {
    }

    async getArticles(): Promise<ArticleEntity[]> {
        try {
            return await ArticleEntity.find();
        } catch (error) {
            throw error;
        }
    }

    async getArticlesById(id: number): Promise<ArticleEntity | null> {
        try {
            return await ArticleEntity.findOneBy({id}) ;
        } catch (error) {
            throw error;
        }
    }

    async createArticle(article: ArticleDto): Promise<ArticleEntity> {
        try {
            const newArticle = ArticleEntity.create({...article});
            return await newArticle.save();
        } catch (error) {
            throw error;
        }
    }

    async updateArticle(article: ArticleDto): Promise<ArticleEntity> {
        try {
            const existingArticle = await ArticleEntity.findOneBy({ id: article.id });

            if (!existingArticle) {
                throw new Error("Article not found");
            }

            Object.assign(existingArticle, article);

            return await ArticleEntity.save(existingArticle);
        } catch (error) {
            console.error("Error updating article:", error);
            throw new Error("Failed to update article");
        }
    }

    async deleteArticle(id: number): Promise<DeleteResult | null> {
        try {
            return await ArticleEntity.delete(id);
        } catch (error) {
            throw error;
        }
    }
}