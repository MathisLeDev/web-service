import React, {useEffect} from "react";
import {axiosInstance} from "../../axiosConfig/axiosInstance";
import ArticleComponent from "../../components/article/ArticleComponent";
import {ArticleType} from "../../types/ArticleType";
import Header from "../../components/Header/Header";

const Home = () => {
    const [articles, setArticles] = React.useState<ArticleType[]>([]);
    const [titleInput, setTitleInput] = React.useState<string>("");
    const [contentInput, setContentInput] = React.useState<string>("");
    const [isLoading, setIsLoading] = React.useState<boolean>(false);


    const fetchArticles = async (page?: number) => {
        const response = await axiosInstance.post('', {
            query: `
        query {
          getArticles {
            id
            title
            content
          }
        }
      `
        });
        return response.data.data;

    }

    useEffect(() => {
        setIsLoading(true);
        fetchArticles().then((response) => {
            setArticles(response.getArticles);
            console.log(response.getArticles);
        }).catch((error) => {

        }).finally(() => {
            setIsLoading(false);
        });
    }, []);

    const handleSubmitArticle = async ({title, content}: {title:string, content:string}) => {
        if (!title || !content) {
            return;
        }
        try {
            const query = `
                mutation createArticle($title: String!, $content: String!) {
                    createArticle(article: {  title: $title, content: $content }) {
                        id
                        title
                        content
                    }
                }
            `;

            const variables = {
                title: title,
                content: content
            };

            const res = await axiosInstance.post("", {query, variables });
            if(res) {
                const newArticles = await fetchArticles()
                if(newArticles) {
                    console.log(newArticles )
                    setArticles(newArticles.getArticles);
                }
            }
        } catch (e) {
        }
    }


    const handleUpdateArticle = async (article: ArticleType) => {
        if (!article.title || !article.content) {
            return;
        }
        try {
            const query = `
                mutation updateArticle($id: Int!, $title: String!, $content: String!) {
                    createArticle(article: { id: $id, title: $title, content: $content }) {
                        id
                        title
                        content
                    }
                }
            `;

            const variables = {
                id: article.id,
                title: article.title,
                content: article.content
            };

            await axiosInstance.post("", {query, variables });
            const res = await axiosInstance.post("", {query, variables });
            if(res) {
                const newArticles = await fetchArticles()
                if(newArticles) {
                    console.log(newArticles )
                    setArticles(newArticles.getArticles);
                }
            }
        } catch (e) {
        }
    }

    const handleDeleteArticle = async (id: string) => {
        try {
            const query = `
                mutation deleteArticle($id: Int!) {
                    deleteArticle(id: $id) {
                        id
                    }
                }
            `;

            const variables = {
                id,
            };

            await axiosInstance.post("", {query, variables});
            const res = await axiosInstance.post("", {query, variables });
            if(res) {
                const newArticles = await fetchArticles()
                if(newArticles) {
                    console.log(newArticles )
                    setArticles(newArticles.getArticles);
                }
            }
        } catch (e) {
        }
    }

    const handlePurchaseArticle  = async (article_id: string) => {
        try {
            const query = `
                mutation purchaseArticle($payment: PaymentDto!) {
                    purchaseArticle(payment: $payment) {
                        id
                        user_name
                        article_id
                        status
                    }
                }            
            `;
            const variables = {
                payment: {
                    user_name: "John Doe",
                    article_id,
                }
            };
            const res = await axiosInstance.post("", {query, variables});
            if (res) {
                const newArticles = await fetchArticles()
                if (newArticles) {
                    console.log(newArticles)
                    setArticles(newArticles.getArticles);
                }
            }

        } catch (e) {
            console.error(e)
        }

    }

    return (
        <div className={'min-h-screen flex flex-col'}>
            <Header/>
            <div className={'p-5'}>
                <h1 className="text-center text-5xl mt-10 pb-20">Articles</h1>
                <ArticleComponent handlePurchaseArticle={()=>{}} handleDeleteArticle={handleDeleteArticle} handleSubmitArticle={handleSubmitArticle} handleUpdateArticle={handleUpdateArticle}/>

                <h1 className="text-center text-5xl mt-20 py-10">Here's some recently added articles</h1>

                <div className={'flex flex-col gap-4'}>
                    {isLoading && <span className={'loading loading-lg mx-auto'}/>}
                    {articles.length > 0 && articles.map((article, index) => (
                        <ArticleComponent handlePurchaseArticle={handlePurchaseArticle} article={article} key={index} handleDeleteArticle={handleDeleteArticle} handleSubmitArticle={handleSubmitArticle} handleUpdateArticle={handleUpdateArticle}/>
                    ))}
                </div>
            </div>

        </div>
    )

};

export default Home;
