import React, { useState, useRef, useEffect } from "react";
import FOG from "vanta/dist/vanta.fog.min";
import * as THREE from "three";

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
        <div className="nav">nav</div>
        {/* replace it with navbar */}
        <div className="content">{children}</div>
      </div>
      <style jsx>{`
        .corner {
          width: 100vw;
          min-height: 100vh;
          height: fit-content;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .main {
          width: 100%;
          max-width: 1336px;
          height: 100%;
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
        .nav {
          height: 5vh;
          width: 100%;
          background-color: red;
        }
        .content {
          width: 100%;
        }
      `}</style>
    </div>
  );
}

// .background canvas {
//   z-index: -50 !important;
// }
