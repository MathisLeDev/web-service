import React from 'react';
import {ArticleType} from "../../types/ArticleType";

type Props = {
    article?: ArticleType | null
    handleSubmitArticle: ({title, content}: {title: string, content: string}) => void
    handleUpdateArticle: (article: ArticleType) => void
    handleDeleteArticle: (id: string) => void
    handlePurchaseArticle?: (articleId: string) => void
}

const ArticleComponent = (props: Props) => {
    const {article, handleUpdateArticle, handleDeleteArticle, handleSubmitArticle, handlePurchaseArticle} = props;
    const [titleInput, setTitleInput] = React.useState<string>(article?.title || '');
    const [contentInput, setContentInput] = React.useState<string>(article?.content || '');

    return (
            <div className={'flex flex-col gap-4'}>
                <div className="mockup-window bg-base-300">
                    <input type={'text'} className="bg-base-200 flex flex-col justify-center text-2xl font-semibold p-4"
                           onChange={(e) => setTitleInput(e.target.value)}
                           value={titleInput} placeholder="Title"/>

                    <div className={"bg-base-200 flex flex-col justify-center px-4"}>
                        <textarea className=" flex flex-col bg-base-200 justify-center h-[150px]  "
                                  onChange={(e) => setContentInput(e.target.value)}
                                  value={contentInput} placeholder="Content"/>

                        <div className={"flex flex-row ml-auto gap-4"}>
                            <button disabled={!article} onClick={() => article?.id && handleDeleteArticle(article.id)}
                                    className="btn btn-secondary text-xl my-4 ml-auto">Remove article
                            </button>
                            <button onClick={() => !!article ? handleUpdateArticle({
                                title: titleInput,
                                content: contentInput,
                                id: article.id
                            }) : handleSubmitArticle({title: titleInput, content: contentInput})}
                                    className="btn btn-primary text-xl my-4 ml-auto">{!!article ? "Modify Article" : "Add Article"}
                            </button>
                            <button disabled={!article} onClick={() => !!article && handlePurchaseArticle && handlePurchaseArticle(article.id) }
                                    className="btn btn-accent text-xl my-4 ml-auto">{"Purchase article"}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

    );
};

export default ArticleComponent;