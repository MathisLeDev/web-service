import React, {useEffect} from "react";
import {axiosInstance} from "../../axiosConfig/axiosInstance";
import Header from "../../components/Header/Header";
import PaymentComponent from "../../components/payment/PaymentComponent";

const Payment = () => {
    const [payments, setPayments] = React.useState([]);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    useEffect(() => {
        const fetchPayments = async () => {
            try {
                setIsLoading(true);
                const query = `
                    query {
                        getPayments {
                            id
                            user_name
                            article {
                              id
                              title
                              content
                            }
                            status
                        }
                    }
                `;
                const response = await axiosInstance.post("", {query});
                setPayments(response.data.data.getPayments);
                console.log(response.data.data.getPayments)
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching payments:", error);
            }
        }
        fetchPayments();
    }, []);

    return (
        <div className={'min-h-screen flex flex-col'}>
            <Header/>
            <div className={'p-5'}>
                <h1 className="text-center text-5xl mt-10 pb-20">Payments</h1>

                <h1 className="text-center text-5xl mt-20 py-10">Here's some recently added payments</h1>

                <div className={'flex flex-col gap-4'}>
                    {isLoading && <span className={'loading loading-lg mx-auto'}/>}
                    {payments.length > 0 && payments.map((payment, index) => (
                        <PaymentComponent payment={payment} key={index} />
                    ))}
                </div>
            </div>

        </div>
    )

};

export default Payment;
