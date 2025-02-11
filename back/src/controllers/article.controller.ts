import {ArticleModel} from "../models/article.model";
import {Request, Response, NextFunction} from "express";
import {ArticleEntity} from "../entities/article.entity";
import {ArticleDto} from "../dtos/article.dto";

export class ArticleController {
    _articleModel = new ArticleModel();
    constructor() {
    }

    async getArticles(request: Request, response: Response, next: NextFunction) {
        try {
            response.status(200).json(this._articleModel.getArticles());
        } catch (error) {
            next(error);
        }
    }

    async getArticlesById(request: Request, response: Response, next: NextFunction) {
        try {
            if(!request.params.id){
                response.status(400).json({message: "No id provided"});
            }
            console.log("debug", request.params.id);
            const article = this._articleModel.getArticlesById(1);
            if(!article){
                response.status(404).json({message: "Article not found"});
            }
            response.status(200).json(article);
        } catch (error) {
            next(error);
        }
    }

    async createArticle(request: Request, response: Response, next: NextFunction) {
        try {
            const article = request.body;
            if(!article){
                response.status(400).json({message: "No article provided"});
            }
            const newArticle = this._articleModel.createArticle(article);
            if(!newArticle){
                response.status(400).json({message: "Article not created"});
            }
            response.status(201).json(newArticle);
        } catch (error) {
            next(error);
        }
    }

    async updateArticle(request: Request, response: Response, next: NextFunction) {
        try {
            const article = request.body;
            if(!article){
                response.status(400).json({message: "No article provided"});
            }
            const updatedArticle = this._articleModel.updateArticle(article);
            if(!updatedArticle){
                response.status(400).json({message: "Article not updated"});
            }
            response.status(200).json(updatedArticle);
        } catch (error) {
            next(error);
        }
    }

}