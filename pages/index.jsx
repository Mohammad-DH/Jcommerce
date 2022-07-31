import Link from "next/link";
import { useState } from "react";

const data = [
  { image: "/target.png", title: "تنوع بالای پیج ها در حوزه های مختلف", info: "تعداد بالای پیج ها در پلتفرم بارکد به شما کمک میکنه تا برای انتخاب، گزینه های مختلفی رو پیش روتون داشته باشین" },
  { image: "/time.png", title: "صرفه جویی در زمان", info: "با پلتفرم بارکد، شما دیگه زمانی رو برای هماهنگی و اجرای تبلیغاتتون اختصاص نمیدین و تمام این پروسه توسط بارکد به بهترین نحو انجام میشه" },
  {
    image: "/income.png",
    title: "صرفه جویی در هزینه",
    info: "از اونجایی که یکی از اهداف بارکد حمایت از کسب وکارهاست، هزینه ی تبلیغات شما با بارکد، به مراتب از این که خودتون مراحل تبلیغاتتون رو انجام بدین کمتره و این موضوع باعث کاهش هزینه های شما میشه",
  },
  { image: "/cinema.png", title: "مشاوره رایگان", info: "قبل از پرداخت هزینه ای برای تبلیغاتتون، میتونین با مشاورین ما در ارتباط باشین تا یک تبلیغ پربازده رو با بارکد تجربه کنین" },
  { image: "/design.png", title: "سناریوی تبلیغاتی", info: "مهم ترین مسئله در تبلیغ، داشتن سناریوی جذاب و محتوای مناسب تبلیغاتیه، بارکد به شما کمک میکنه تا سناریوی طلایی خودتون رو پیدا کنین" },
  {
    image: "/writing.png",
    title: "تولید محتوای تبلیغاتی",
    info: "احساس می‌کنین که پیجتون آماده‌ی تبلیغاته اما محتوای مناسبتون رو ندارین؟ احساس میکنین ایده‌ی جذابی برای ساخت محتوای تبلیغاتتون ندارین؟ بارکد برای ساخت یک محتوای جذاب و باکیفیت در کنار شماست",
  },
];

export default function Home() {
  const [ActiveCard, setActiveCard] = useState(0);
  return (
    <div className="home">
      <div className="Glass section section1">
        <img src="/Hands.png" alt="" />
        <div className="text">
          <h1>بارکد</h1>
          <h2>پلتفرم مارکتینگ و تبلیغات مجازی</h2>
          <h3>گروه بارکد اینجاست تا کسب و کار شمارو در سطح گسترده ای به عرصه ی نمایش بگذارد</h3>
          <Link href="/shop">
            <span className="btn">لیست اکانت ها</span>
          </Link>
        </div>
      </div>
      <div className="Glass why">
        <h4>چرا بارکد ؟</h4>
      </div>
      <div className="Glass section section2 ">
        <div className="panel">
          <p>{data[ActiveCard].info}</p>
        </div>
        <div className="list">
          {data.map((e, i) => {
            return (
              <div onMouseEnter={() => setActiveCard(i)} className="Glass card">
                <img src={e.image} alt="" />
                <h3>{e.title}</h3>
              </div>
            );
          })}
        </div>
      </div>
      <style jsx>{`
        .home {
          position: absolute;
          top: calc(var(--nav-height) + var(--nav-margin));
          left: 0;
          width: 100vw;
          height: fit-content;
          min-height: 100vh;
          padding-bottom: 5vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
        }
        .home h1 {
          font-size: 2.5rem;
        }
        .home p {
          font-size: 1.5rem;
        }
        .section1 {
          background-color: rgba(255, 255, 255, 0.3);
          justify-content: space-evenly !important;
        }
        .section1 img {
          width: 35%;
          margin-left: 2vw;
        }
        .text {
          position: relative;
          width: 60%;
          height: 100%;
          padding-top: 1rem;
          padding-right: 3rem;
          text-align: right;
          display: flex;
          flex-direction: column;
          align-items: flex-end;
          justify-content: flex-start;
        }
        .text h1 {
          margin: 0;
          padding: 0;
          font-size: 15vw;
          background: right center / contain url("http://localhost:3000/ab.jpg");
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-size: 50%;
          background-repeat: repeat;
          animation: bg 6s linear infinite;
        }
        @keyframes bg1 {
          0% {
            background-position: right center;
          }
          50% {
            background-position: left center;
          }
          100% {
            background-position: right center;
          }
        }
        @keyframes bg {
          0% {
            background-position: right center;
          }

          100% {
            background-position: left center;
          }
        }
        .btn {
          position: absolute;
          bottom: 12%;
          align-self: center;
          padding: 1rem 2rem;
          background-color: var(--dark-green);
          font-size: 1.6vw;
          color: white;
          border-radius: 1rem;
          cursor: pointer;
        }
        .section {
          margin-top: 5vh;
          width: 90%;
          height: 85vh;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .why {
          width: 100%;
          height: 55vh;
          margin-top: 5vh;
          display: flex;
          align-items: center;
          justify-content: center;

          color: white;
        }
        .why h4 {
          font-size: 8vw;
        }
        .section2 {
          justify-content: space-evenly;
        }
        .list {
          width: 35%;
          height: 60vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-evenly;
        }
        .card {
          height: 8vh;
          width: 50%;
          padding: 0 2rem 0 1rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
          text-align: right;
          border-radius: 1rem;
          cursor: pointer;
          transition: all 0.2s linear;
        }
        .card:hover {
          transform: scale(1.05) translateX(1.5rem);
        }
        .card img {
          height: 85%;
        }
        .panel {
          width: 58%;
          height: 91.5%;
          padding: 1rem 3rem;
          background-color: rgba(255, 255, 255, 0.8);
          display: flex;
          align-items: flex-start;
          justify-content: flex-end;
          text-align: right;
          border-radius: 1rem;
        }
      `}</style>
    </div>
  );
}
