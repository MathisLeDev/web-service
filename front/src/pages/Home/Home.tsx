import React, {useEffect} from "react";
import {axiosInstance} from "../../axiosConfig/axiosInstance";
import ArticleComponent from "../../components/article/ArticleComponent";
import {ArticleType} from "../../types/ArticleType";
import Header from "../../components/Header/Header";

const Home = () => {
    const [articles, setArticles] = React.useState<ArticleType[]>([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    const fetchArticles = async (page?: number) => {
        const response = await axiosInstance.get('/products')
        return response.data;
    }

    useEffect(() => {
        setIsLoading(true);
        fetchArticles().then((response) => {
            setArticles(response);
        }).catch((error) => {

        }).finally(() => {
            setIsLoading(false);
        });
    }, []);

    const handleSubmitArticle = async ({title, content}: {title:string, content:string}) => {
        try {
            const body = {
                title,
                content,
            }
            const res = await axiosInstance.post("/products", body);
            if(res) {
                const newArticles = await fetchArticles()
                if(newArticles) {
                    setArticles(newArticles);
                }
            }
        } catch (e) {
        }
    }


    const handleUpdateArticle = async (article: ArticleType) => {
        try {
            const body ={
                title: article.title
            }
            const res = await axiosInstance.put(`/products/${article.id}`, body)
            if (res) {
                const newArticles = await fetchArticles()
                if (newArticles) {
                    setArticles(newArticles);
                }
            }
        } catch (e) {
            console.error(e)
        }
    }

    const handleDeleteArticle = async (id: string) => {
        try {
            const res = await axiosInstance.delete(`/products/${id}`)
            if (res) {
                const newArticles = await fetchArticles()
                if (newArticles) {
                    setArticles(newArticles);
                }
            }
        } catch (e) {
            console.error(e)
        }
    }

    const handlePurchaseArticle  = async (article_id: string) => {
        try {
            const body = {
                id: article_id
            }
            const res = await axiosInstance.post("/purchases", body)
            if (res) {
                const newArticles = await fetchArticles()
                if (newArticles) {
                    setArticles(newArticles);
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
