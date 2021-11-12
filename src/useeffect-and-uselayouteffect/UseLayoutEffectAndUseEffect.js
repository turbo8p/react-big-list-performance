import { useState, useEffect, useLayoutEffect } from "react";

const FlickeringComponent = () => {
  const [number, setNumber] = useState(0);

  useEffect(() => {
    if (number === 0) {
      setNumber(10 + Math.random());
    }
  }, [number]);

  return (
    <>
      <div
        style={{
          backgroundColor: number === 0 ? "red" : "green",
          color: "white",
        }}
      >
        Number: {number}
      </div>
      <br />
      <button onClick={() => setNumber(0)}>Randomize</button>
    </>
  );
};

const NonFlickeringComponent = () => {
  const [number, setNumber] = useState(0);

  useLayoutEffect(() => {
    if (number === 0) {
      setNumber(10 + Math.random());
    }
  }, [number]);

  return (
    <>
      <div
        style={{
          backgroundColor: number === 0 ? "red" : "green",
          color: "white",
        }}
      >
        Number: {number}
      </div>
      <br />
      <button onClick={() => setNumber(0)}>Randomize</button>
    </>
  );
};

function UseLayoutEffectAndUseEffect() {
  return (
    <>
      <h1>Flickering (with useEffect())</h1>
      <FlickeringComponent />

      <h1>Non Flickering (with useLayoutEffect())</h1>

      <NonFlickeringComponent />
    </>
  );
}

export default UseLayoutEffectAndUseEffect;
