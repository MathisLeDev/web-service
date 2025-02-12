import React from 'react';
import {ArticleType} from "../../types/ArticleType";
import {PaymentType} from "../../types/PaymentType";

type Props = {
    payment?: PaymentType | null
}

const PaymentComponent = (props: Props) => {
    const {payment} = props;

    const getStyle = (status?: string) => {
        switch (status) {
            case "processing":
                return "bg-yellow-600";
            case "processed":
                return "bg-green-600";
            default:
                return "bg-yellow-200";
        }
    }

    return (
            <div className={'flex flex-col gap-4'}>
                <div className="mockup-window bg-base-300">
                    <div className={"bg-base-200 flex flex-col justify-center px-4 gap-4"}>
                        <div className="flex flex-row gap-2">
                        <span className=" text-2xl font-semibold">
                            Title :
                        </span>
                            <span className=" text-2xl font-semibold">
                            {payment?.article?.title}
                        </span>
                        </div>

                        <div className="flex flex-col">
                        <span className=" text-2xl font-semibold">
                            Content :
                        </span>
                            <span className=" text-2xl font-semibold">
                            {payment?.article?.content}
                        </span>
                        </div>

                        <span className={`${getStyle(payment?.status)} + " mx-auto text-white p-2 rounded-md mb-4 font-semibold`}>
                            {payment?.status}
                        </span>

                    </div>
                </div>
            </div>

    )
        ;
};

export default PaymentComponent;