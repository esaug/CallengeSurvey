import { useEffect, useState } from "react";

export const Timer = (props: any) => {
  /**
   * Hooks
   */
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0.5);
  const [arrive, setArrive] = useState(true);

  /**
   * Defining initial seconds.
   *  */
  useEffect(() => {
    setSeconds(props.seconds);
  }, []);

  useEffect(() => {
    /**
     * Event Detector.
     */
    if (seconds === 0 && arrive) {
      props.action();
      setArrive(false);
    } else if (props.reset) {
      props.actionReset(false);
      setSeconds(props.seconds);
      setArrive(true);
    }

    /**
     * Chronometer
     */
    let myInterval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(myInterval);
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      }
    }, 1000);
    return () => {
      clearInterval(myInterval);
    };
  });

  return <div>{seconds >= 10 ? "0:" + seconds : "0:0" + seconds}</div>;
};


