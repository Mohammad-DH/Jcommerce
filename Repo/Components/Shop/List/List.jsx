import React from "react";
import Card from "./Card";
export default function List({ Products }) {
  return (
    <div className=" list">
      {Products.map((e, index) => {
        return <Card key={index} id={index} e={e} />;
      })}
      <style jsx>{`
        .list {
          width: 100%;
          height: fit-content;
          display: flex;
          align-items: flex-start;
          justify-content: space-evenly;
          flex-wrap: wrap;
          padding-top: 3vh;
        }
      `}</style>
    </div>
  );
}
