import React, { useState, useRef, useEffect, useContext } from "react";
import FOG from "vanta/dist/vanta.fog.min";
import * as THREE from "three";
import Navbar from "../navbar/Navbar";

export default function UserLayout({ children }) {
  const [vantaEffect, setVantaEffect] = useState(0);
  const vantaRef = useRef(null);

  useEffect(() => {
    if (!vantaEffect) {
      setVantaEffect(
        FOG({
          el: vantaRef.current,
          THREE,
          highlightColor: "#d088ff",
          midtoneColor: "#ff0000",
          lowlightColor: "#ffd997",
          baseColor: "#ffffff",
        })
      );
    }
    return () => {
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [vantaEffect]);

  return (
    <div className="corner">
      <div className="main">
        <div className="background" ref={vantaRef}></div>
        <Navbar />
        <div className="content">{children}</div>
      </div>
      <style jsx>{`
        .corner {
          width: 100vw;
          height: fit-content;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .main {
          width: 100%;
          max-width: 1336px;
          height: 100%;
          min-height: 100vh;
          display: flex;
          flex-direction: column;
        }
        .background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          z-index: -50 !important;
        }

        .content {
          width: 100%;
          height: 100%;
          min-height: var(--min-height);
        }
      `}</style>
    </div>
  );
}

// .background canvas {
//   z-index: -50 !important;
// }
