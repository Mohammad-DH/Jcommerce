import gsap, { Linear } from "gsap";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function OrderBTN({ exist, Active, Order, userIsCompleted, isLoggedIn }) {
  const [BTN_TL, setBTN_TL] = useState(gsap.timeline({ paused: false }));
  const [DetailLength, setDetailLength] = useState();
  const [Replace, setReplace] = useState(0);

  const ref_detail = React.useRef();
  const ref_btn = React.useRef();

  useEffect(() => {
    setDetailLength(ref_detail.current.textContent.length);
  }, []);

  const router = useRouter();

  const BTN_In = () => {
    BTN_TL.to(".BTNDetail", {
      duration: 0.7,
      width: `${DetailLength + 3}%`,
      ease: Linear.easeNone,
    })
      .add(function () {
        if (!isLoggedIn) {
          setReplace(1);
        } else if (isLoggedIn && !userIsCompleted) {
          setReplace(2);
        }
      })
      .to(".BTNDetail", {
        duration: 0.5,
        opacity: 1,
        ease: Linear.easeNone,
      });
  };
  const BTN_Out = () => {
    BTN_TL.to(".BTNDetail", {
      duration: 0.5,
      opacity: 0,
      ease: Linear.easeNone,
    })
      .add(function () {
        setReplace(0);
      })
      .to(".BTNDetail", {
        duration: 0.7,
        width: "0%",
        ease: Linear.easeNone,
      });
  };

  const click = () => {
    if (!exist && isLoggedIn && userIsCompleted) {
      Order();
    } else if (!exist && isLoggedIn && !userIsCompleted) {
      //redirect to account
    } else if (!isLoggedIn) {
      //redirect to login
      router.push("/auth");
    }
  };

  return (
    <div onMouseEnter={BTN_In} onMouseLeave={BTN_Out} className="BTNBox">
      <span ref={ref_btn} onClick={click} className={exist || Active ? "BTN done" : "BTN BTNActive"}>
        {exist ? "قبلا سفارش دادید" : Active ? "سفارش شما ثبت شد" : Replace === 1 ? "ورود / ثبت نام" : Replace === 2 ? "تکمیل اطلاعات" : "ثبت سفارش"}
      </span>

      <span ref={ref_detail} className="BTNDetail">
        {exist
          ? "این محصول برای شما قبلا ثبت شده است"
          : Active
          ? "از اعتماد شما به ما ممنونیم"
          : !isLoggedIn
          ? "برای ثبت سفارش لطفا وارد شوید"
          : !userIsCompleted
          ? "اطلاعات کاربری شما کامل نیست برای تکمیل کلیک کنید"
          : "خدمت رسانی به شما افتخار ماست"}
      </span>

      <style jsx>{`
        .BTNBox {
          position: absolute;
          width: 100%;
          height: 4vw;
          overflow: hidden;
          bottom: 5%;
          display: flex;
          flex-direction: row-reverse;
          align-items: center;
          justify-content: center;
          align-self: center;
        }
        .BTN {
          height: 4vw;
          position: relative;
          right: 0;
          padding: 0.8vw 1.5vw;
          border-radius: 0.5vw;
          font-size: 1.3vw;
        }
        .done {
          background-color: var(--dark-green);
          border: none;
          color: white;
        }
        .BTNActive {
          border: 0.1vw solid var(--blue);
          color: var(--blue);
          cursor: pointer;
          transition: all 0.3s linear;
          cursor: pointer;
        }
        .BTNActive:hover {
          background-color: var(--blue);
          color: white;
        }
        .BTNDetail {
          width: 0%;
          opacity: 0;
          font-size: 1vw;
          overflow: hidden;
          margin-right: 1rem;
        }
      `}</style>
    </div>
  );
}
