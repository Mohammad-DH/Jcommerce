import axios from "axios";
import Link from "next/link";
import React from "react";

const remove = async (Product_Id) => {
    await axios.post("/api/product/remove", {Product_Id: Product_Id});
};

export default function Item({obj}) {
    const {
        Product_Id,
        Name,
        Description
    } = obj;

    return (
        <div className="Item">
            {/*<img src={`/${Image}`} alt="" />*/}
            <div className="texts">
                <p>{Description}</p>
            </div>
            <div className="controler">
                <Link
                    href={{
                        pathname: `shop/update`,
                        query: {
                            Product_Id,
                            Name,
                            Description,
                            // Image
                        },
                    }}
                >
                    U
                </Link>
                ;<span onClick={() => remove(Product_Id)}>X</span>
            </div>
            <style jsx>{`
              .Item {
                width: 100%;
                height: 20vh;
                display: flex;
                align-items: flex-start;
                border: 1px solid black;
              }

              .Item img {
                width: 20vh;
                height: 20vh;
              }

              .texts {
                width: 100%;
                padding: 0 2.5%;
              }

              .header {
                display: flex;
                align-items: flex-start;
              }

              .header h4 {
                margin-left: 5%;
              }

              .controler {
                width: 4vw;
                height: 100%;
                background-color: red;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-evenly;
                font-size: 2rem;
              }
            `}</style>
        </div>
    );
}