import axios from "axios";
import React, { useState } from "react";
import { useRouter } from "next/router";

export default function Auth() {
  const [PhoneNumber, setPhoneNumber] = useState("");
  const [Code, setCode] = useState("");
  const [Step, setStep] = useState(0);

  const router = useRouter();

  const auth = async (PN) => {
    if (PN.length === 11) {
      await axios.post("/api/auth", { PhoneNumber: PN }).then((res) => {
        if (res.status === 200) {
          setStep(1);
        }
      });
    }
  };

  const post = async (PN, code) => {
    if (code.length === 6) {
      await axios
        .post("/api/login", {
          PhoneNumber: PN,
          Code: code,
        })
        .then((res) => {
          if (res.status === 200) {
            router.push(res.data.redirect);
          }
        });
    }
  };

  return (
    <div className="LoginPage">
      {Step === 0 ? (
        <div className="Glass LoginForm">
          <h1>BARCODE</h1>
          <div className="LoginInner">
            <h3>ورود | ثبت&zwnj;نام</h3>
            <h4>لطفا شماره تلفن خود را وارد کنید</h4>
            <input className="phoneInput" value={PhoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} type="string" />
          </div>
          <span className="formBtn" onClick={(e) => auth(PhoneNumber)}>
            ارسال
          </span>
        </div>
      ) : (
        <div className="Glass LoginForm">
          <h1>BARCODE</h1>
          <div className="LoginInner">
            <h3>ورود | ثبت&zwnj;نام</h3>
            <h4>لطفا کد فرستاده شده به شماره {PhoneNumber} را وارد کنید </h4>
            <input className="codeInput" value={Code} onChange={(e) => setCode(e.target.value)} type="text" maxLength={6} />
          </div>
          <span className="formBtn" onClick={(e) => post(PhoneNumber, Code)}>
            ورود
          </span>
        </div>
      )}

      <style jsx>{`
        .LoginPage {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 94vh;
        }
        .LoginForm {
          width: 30%;
          height: 30%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-around;
          text-align: right;
        }
        .LoginForm h1 {
          margin: 0;
          padding: 0;
        }
        .LoginForm h3,
        h4,
        input {
          padding: 0 2%;
          width: 88%;
          margin: 0.5rem;
        }
        .LoginForm h4 {
          font-size: 0.8rem;
        }
        .LoginForm input {
          height: 3rem;
          border-radius: 10px;
          border: 2px solid var(--light-blue);
          text-align: right;
          outline: none;
        }
        //hide arrows
        /* Chrome, Safari, Edge, Opera */
        .LoginForm input::-webkit-outer-spin-button,
        .LoginForm input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }

        /* Firefox */
        .LoginForm input[type="number"] {
          -moz-appearance: textfield;
        }
        //End hide arrows

        .LoginForm input:focus {
          border: 2px solid var(--blue);
        }
        .phoneInput {
          font-size: 1.2rem;
          letter-spacing: 0.2rem;
        }
        .LoginInner {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          width: 100%;
        }
        .codeInput {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: flex-start;
          width: 50%;
          font-size: 1.5rem;
          letter-spacing: 1rem;
        }
        .formBtn {
          width: 90%;
          background-color: var(--blue);
          height: 3rem;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 10px;
          color: white;
          font-size: 1.4rem;
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}

export async function getServerSideProps({ req, res, query }) {
  let token = req.cookies.jwtToken;

  if (token) {
    return {
      redirect: {
        destination: "/account",
        permanent: false,
      },
    };
  }
  return { props: { message: "not logged in" } };
}
