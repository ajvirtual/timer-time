import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { TimeStatContext } from "./../../../tools/timerStatProvider";
import { SettingContext } from "./../../../tools/settingProvider";
import {
  addTime,
  removeLastTime,
  calcAo3,
  calcAo5,
  calcAo12,
  calcAo50,
  calcAo100,
  calcAo1000,
  calcBest,
  calcWorst,
  calcNumTime,
} from "./../../../tools/timeStatAction";
import "./timerwatchpanel.css";

const generateScramble = (
  letter_move_3x3 = [
    "U",
    "U2",
    "D",
    "D2",
    "F",
    "F2",
    "B",
    "B2",
    "L",
    "L2",
    "R",
    "R2",
  ],
  sramble_length = 21
) => {
  var scramble = [""];
  for (let i = 0; i < sramble_length; i++) {
    let random_num = null;
    if (i === 0)
      random_num = Math.floor(Math.random() * letter_move_3x3.length);
    else random_num = Math.floor(Math.random() * (letter_move_3x3.length - 2));
    var no_repeat_array = [];
    no_repeat_array = letter_move_3x3.filter(
      (l) => l.substr(0, 1) !== scramble[scramble.length - 1].substr(0, 1)
    );
    let new_s = no_repeat_array[random_num];
    scramble.push(new_s);
  }
  return scramble.join(" ").trim();
};

function Index() {
  const [time, setTime] = useState({
    week: 0,
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
    centiemesecond: 0,
  });
  const time_backend = useRef({
    week: 0,
    day: 0,
    hour: 0,
    minute: 0,
    second: 0,
    centiemesecond: 0,
  });
  const started_ref = useRef(false);
  const [started_state, setStartedState] = useState(false);
  const timeInterval = useRef(null);
  const time_deleted = useRef(false);
  const plus2ed = useRef(false);
  const [clickable, setClickable] = useState(false);
  const [time_screen, setTimeScreen] = useState("TIME"); // TIME | S_TIME | DNF
  // const [state, dispatch] = TimeStatContext()
  const [state, setState] = TimeStatContext();
  const [setting, setSetting] = SettingContext();
  const [scramble, setScramble] = useState(generateScramble());

  // inspection
  const [inspection_started, setStartedInspection] = useState(false);
  const started_after_inspect_ref = useRef(false); // start after inspection flag state

  // const [timeout_inspection, setTimeoutInspection] = useState(0);
  // const inspection_interval = useRef(null);
  // const current_inspection_time = useRef(0);
  // const [time_inspection_setting, setTimeInspection] = useState(
  //   setting.inspection_time
  // );

  const newScramble = async (e) => {
    const new_scramble = generateScramble();
    setScramble(new_scramble);
  };

  const updateTimeStatistic = async () => {
    calcNumTime(setState);
    calcBest(setState);
    calcWorst(setState);
    calcAo3(setState);
    calcAo5(setState);
    calcAo12(setState);
    calcAo50(setState);
    calcAo100(setState);
    calcAo1000(setState);
    setState((state) => {
      return {
        ...state,
        toogleUpdate: !state.toogleUpdate,
      };
    });
  };

  const plusTwoTime = async (e) => {
    e && e.stopPropagation();

    if (
      // time.centiemesecond +
      //   time.second +
      //   time.minute * 60 +
      //   time.hour * 3600 +
      //   time.day * 86400 +
      //   time.week * 604800 ===
      //   0 ||
      // time_screen === "DNF" ||
      // plus2ed.current
      time_backend.current.centiemesecond +
        time_backend.current.second +
        time_backend.current.minute * 60 +
        time_backend.current.hour * 3600 +
        time_backend.current.day * 86400 +
        time_backend.current.week * 604800 ===
        0 ||
      time_screen === "DNF" ||
      plus2ed.current
    )
      return false;

    // const total_second_plus_2 =
    //   time.second +
    //   time.minute * 60 +
    //   time.hour * 3600 +
    //   time.day * 86400 +
    //   time.week * 604800 +
    //   2;
    const total_second_plus_2 =
      time_backend.current.second +
      time_backend.current.minute * 60 +
      time_backend.current.hour * 3600 +
      time_backend.current.day * 86400 +
      time_backend.current.week * 604800 +
      2;

    if (!plus2ed.current) {
      // setTime((all_times) => {
      //   return {
      //     ...all_times,
      //     week: Math.floor(total_second_plus_2 / 604800),
      //     day: Math.floor((total_second_plus_2 % 604800) / 86400),
      //     hour: Math.floor((total_second_plus_2 % 86400) / 3600),
      //     minute: Math.floor((total_second_plus_2 % 3600) / 60),
      //     second:
      //       total_second_plus_2 < 60
      //         ? total_second_plus_2
      //         : Math.floor(total_second_plus_2 % 60),
      //   };
      // });
      time_backend.current.week = Math.floor(total_second_plus_2 / 604800);
      time_backend.current.day = Math.floor(
        (total_second_plus_2 % 604800) / 86400
      );
      time_backend.current.hour = Math.floor(
        (total_second_plus_2 % 86400) / 3600
      );
      time_backend.current.minute = Math.floor(
        (total_second_plus_2 % 3600) / 60
      );
      time_backend.current.second =
        total_second_plus_2 < 60
          ? total_second_plus_2
          : Math.floor(total_second_plus_2 % 60);
    }

    const total_centieme_plus2 =
      time_backend.current.centiemesecond +
      time_backend.current.second * 100 +
      time_backend.current.minute * 6000 +
      time_backend.current.hour * 360000 +
      time_backend.current.day * 8640000 +
      time_backend.current.week * 60480000; /*  +
      200 */ // total time in centiemesecond plus 2 second
    console.log(total_centieme_plus2);
    removeLastTime(setState);
    addTime(setState, total_centieme_plus2, scramble);
    await updateTimeStatistic();
    console.log("plus two");
    plus2ed.current = true;
    return true;
  };

  const setDNFTime = async (e) => {
    e && e.stopPropagation();
    if ("DNF" === time_screen || plus2ed.current)
      //time.centiemesecond + time.second + time.minute * 60 + time.hour * 3600 + time.day * 86400 + time.week * 604800 === 0;
      return false;
    await updateTimeStatistic();
    setTimeScreen("DNF");
    console.log("dnf");
    return true;
  };

  // deleteCurrentTime : delete the current time from adding in the statistic and reset the screen timer to 0.0
  const deleteCurrentTime = async (e) => {
    e && e.stopPropagation();
    if (!time_deleted.current) {
      setTimeScreen("TIME");
      resetTimer();
      // dispatch({type: time_stat_action.REMOVE_LAST_TIME})
      removeLastTime(setState);
      await updateTimeStatistic();
      console.log("time deleted");
    }

    time_deleted.current = true;
    setSetting((s) => {
      return { ...s, current_deleted: true };
    });
  };

  //    const handleTimer = useCallback(
  //         async (e, setting_) => {
  //         if( 32 === e.keyCode || 'mousedown' === e.type ) {
  //             if(started_ref.current) {
  //                 await stopTimer(timeInterval.current, setting_)
  //                 var btn_not_disabled = document.querySelectorAll('.timer-options button')

  //                 for(let i = 0; i < btn_not_disabled.length; i++) {
  //                     btn_not_disabled[i].disabled = false
  //                 }
  //             } else {
  //                 console.log(setting_)
  //                 timeInterval.current = await startTimer(setting_)
  //                 var btn_disabled = document.querySelectorAll('.timer-options button')
  //                 for(let i = 0; i < btn_disabled.length; i++) {
  //                     btn_disabled[i].disabled = true
  //                 }
  //             }
  //             started_ref.current = !started_ref.current
  //             }
  //         },
  //         [],
  //     )

  const resetTimer = () => {
    setTime((all_times) => {
      return {
        week: 0,
        day: 0,
        hour: 0,
        minute: 0,
        second: 0,
        centiemesecond: 0,
      };
    });
    time_backend.current.week = 0;
    time_backend.current.day = 0;
    time_backend.current.hour = 0;
    time_backend.current.minute = 0;
    time_backend.current.second = 0;
    time_backend.current.centiemesecond = 0;
    plus2ed.current = false;
  };

  const [refresh_time, refreshTime] = useState(false);
  const startTimer = async () => {
    var timeInterval = window.setInterval(() => {
      // setTime((all_times) => {
      //   return {
      //     ...all_times,
      //     week: 7 === all_times.day ? all_times.week + 1 : 0,
      //     day:
      //       7 === all_times.day
      //         ? 0
      //         : 24 === all_times.hour
      //         ? all_times.day + 1
      //         : all_times.day,
      //     hour:
      //       24 === all_times.hour
      //         ? 0
      //         : 60 === all_times.minute
      //         ? all_times.hour + 1
      //         : all_times.hour,
      //     minute:
      //       all_times.minute > 59
      //         ? 0
      //         : 60 === all_times.second
      //         ? all_times.minute + 1
      //         : all_times.minute,
      //     second:
      //       all_times.second > 59
      //         ? 0
      //         : 99 === all_times.centiemesecond
      //         ? all_times.second + 1
      //         : all_times.second,
      //     centiemesecond:
      //       all_times.centiemesecond >= 99 ? 0 : all_times.centiemesecond + 1,
      //   };
      // });

      setStartedState(true);

      time_backend.current.week =
        7 === time_backend.current.day ? time_backend.current.week + 1 : 0;
      time_backend.current.day =
        7 === time_backend.current.day
          ? 0
          : 24 === time_backend.current.hour
          ? time_backend.current.day + 1
          : time_backend.current.day;
      time_backend.current.hour =
        24 === time_backend.current.hour
          ? 0
          : 60 === time_backend.current.minute
          ? time_backend.current.hour + 1
          : time_backend.current.hour;
      time_backend.current.minute =
        time_backend.current.minute > 59
          ? 0
          : 60 === time_backend.current.second
          ? time_backend.current.minute + 1
          : time_backend.current.minute;
      time_backend.current.second =
        time_backend.current.second > 59
          ? 0
          : 99 === time_backend.current.centiemesecond
          ? time_backend.current.second + 1
          : time_backend.current.second;
      time_backend.current.centiemesecond =
        time_backend.current.centiemesecond >= 99
          ? 0
          : time_backend.current.centiemesecond + 1;

      // display to screen
      const week =
          time_backend.current.week === 0
            ? ""
            : time_backend.current.week < 10
            ? `0${time_backend.current.week} : `
            : time_backend.current.week + " : ",
        day =
          time_backend.current.day === 0
            ? time_backend.current.week > 0
              ? "00 : "
              : ""
            : time_backend.current.day < 10
            ? `0${time_backend.current.day} : `
            : time_backend.current.day + " : ",
        hour =
          time_backend.current.hour === 0
            ? time_backend.current.day > 0
              ? "00 : "
              : ""
            : time_backend.current.hour < 10
            ? `0${time_backend.current.hour} : `
            : time_backend.current.hour + " : ",
        minute =
          time_backend.current.minute === 0
            ? time_backend.current.hour > 0
              ? "00 : "
              : ""
            : time_backend.current.minute < 10
            ? `0${time_backend.current.minute} : `
            : time_backend.current.minute + " : ",
        second =
          time_backend.current.second < 10
            ? `0${time_backend.current.second} : `
            : time_backend.current.second + " : ",
        centiemesecond =
          time_backend.current.centiemesecond < 10
            ? `0${time_backend.current.centiemesecond}`
            : time_backend.current.centiemesecond;
      // const s_second = time_backend.current.second + " .";

      document.querySelector(
        "#timer-run-screen"
      ).innerHTML = `${week} ${day} ${hour} ${minute} ${second} ${centiemesecond}`;
    }, 10);
    setTimeScreen("TIME");
    resetTimer();

    time_deleted.current = false;
    // console.log(scramble)

    return timeInterval;
  };

  const stopTimer = async (timeInterval, addToStat = true) => {
    window.clearInterval(timeInterval);
    setStartedState(false);

    if (addToStat) {
      let total_time =
        time_backend.current.centiemesecond +
        time_backend.current.second * 100 +
        time_backend.current.minute * 6000 +
        time_backend.current.hour * 360000 +
        time_backend.current.day * 8640000 +
        time_backend.current.week * 60480000; // total time in centiemesecond

      if (total_time < 6000) {
        setTimeScreen("S_TIME");
      }

      addTime(setState, total_time, scramble);

      await newScramble();
      // const new_scramble = await newScramble()
      // addTime(setState, total_time, new_scramble)

      await updateTimeStatistic();

      // console.log(scramble)
    }
  };

  const handleTimer = async (e) => {
    if (e.keyCode === 27) {
      // debugger;
      setTimeScreen("S_TIME");
      await newScramble();
      // keypress on ESC
      if (started_ref.current) {
        console.log("ESC clicked: timing canceled");
        resetTimer();
        stopTimer(timeInterval.current, false);
        started_ref.current = false;
      } else console.log("timer not yet started");
    } else if (32 === e.keyCode || "mousedown" === e.type) {
      if (started_ref.current) {
        await stopTimer(timeInterval.current);
        var btn_not_disabled = document.querySelectorAll(
          ".timer-options button"
        );

        for (let i = 0; i < btn_not_disabled.length; i++) {
          btn_not_disabled[i].disabled = false;
        }
      } else {
        timeInterval.current = await startTimer();
        var btn_disabled = document.querySelectorAll(".timer-options button");
        for (let i = 0; i < btn_disabled.length; i++) {
          btn_disabled[i].disabled = true;
        }
      }
      started_ref.current = !started_ref.current;
    }
  };

  const launchInspection = useCallback((e) => {
    // document.removeEventListener("keydown", launchInspection);
    // setTimeoutInspection(0); // reiinitilize inspection time
    if (32 === e.keyCode) {
      if (!started_after_inspect_ref.current) {
        console.log("launcInspection launched");
        setStartedInspection(true);
      } else {
        console.log("launcInspection not launched");
      }
    }
  }, []);

  ////////////////////////////////

  const InspectionScreen = () => {
    const inspection_interval = useRef(null);
    const middle_stopped_inspection = useRef(false);
    const [timeout_inspection, setTimeoutInspection] = useState(
      setting.inspection_time
    );

    const mouseoverHandle = () => {
      setClickable(true);
      document.addEventListener("mousedown", _handleTimer_);
    };

    const mouseoutHandle = () => {
      setClickable(false);
      document.removeEventListener("mousedown", _handleTimer_);
    };
    // cancelInspection : it offer the ability to cancel a started inspection and get back to the reseted screen
    const cancelInspection = (e) => {
      if ("Escape" === e.key) {
        setTimeScreen("S_TIME");
        // const new_scramble = generateScramble();
        // setScramble(new_scramble); // regenerate a new scramble so that it differ from previous one
        document.removeEventListener("keypress", _handleTimer_);
        console.log("click on ESC : timer canceled"); // remove inspection
        setStartedInspection(false); // to stop display
        clearInterval(inspection_interval.current); // stop inpsection time
        setTimeoutInspection(0); // reiinitilize
      }
    };
    const cancelTimer = (e) => {
      if ("Escape" === e.key) {
        setTimeScreen("S_TIME");
        resetTimer();
        newScramble(); // regenerate a new scramble so that it differ from previous one
        document.removeEventListener("keydown", cancelTimer);
        document.removeEventListener("keypress", _handleTimer_);
        window.clearInterval(timeInterval.current);
        setStartedState(false);
        started_after_inspect_ref.current = false;
      }
    };
    const _handleTimer_ = async (e) => {
      if (32 === e.keyCode) {
        // remove inspection
        setStartedInspection(false); // to stop display
        clearInterval(inspection_interval.current); // stop inpsection time
        setTimeoutInspection(0); // reiinitilize inspection time
        // remove inspection

        if (started_after_inspect_ref.current) {
          let timer_frame = document.querySelector("#timer-watch-frame");
          document.removeEventListener("keypress", _handleTimer_);
          // timer_frame.removeEventListener("mouseover", mouseoverHandle);
          // timer_frame.removeEventListener("mouseout", mouseoutHandle);
          middle_stopped_inspection.current = false;
          await stopTimer(timeInterval.current);
          document.removeEventListener("keydown", cancelTimer);

          var btn_not_disabled = document.querySelectorAll(
            ".timer-options button"
          );

          for (let i = 0; i < btn_not_disabled.length; i++) {
            btn_not_disabled[i].disabled = false;
          }
        } else {
          timeInterval.current = await startTimer();

          document.addEventListener("keydown", cancelTimer);
          var btn_disabled = document.querySelectorAll(".timer-options button");
          for (let i = 0; i < btn_disabled.length; i++) {
            btn_disabled[i].disabled = true;
          }
          // document.addEventListener("keydown", (e) => {
          //   if ("Escape" === e.key) {
          //     stopTimer(timeInterval.current, false);
          //     resetTimer();
          //   }
          // });
        }
        started_after_inspect_ref.current = !started_after_inspect_ref.current;
      }
    };

    const inspect = () => {
      let interval = setInterval(() => {
        setTimeoutInspection((i) => i - 1);
      }, 1000);
      inspection_interval.current = interval;
    };

    useEffect(() => {
      if (timeout_inspection === 0) {
        setStartedInspection(false); // stop display
        middle_stopped_inspection.current = true; // flag to stop eventlistner on _handleTimer_ and to be able to restart ispection
        clearInterval(inspection_interval.current); // stop inpsection time
        setTimeoutInspection(setting.inspection_time); // reiinitilize inspection time
        // document.removeEventListener("keypress", _handleTimer_);
        setDNFTime();
      }
    }, [timeout_inspection]);

    useEffect(() => {
      console.log("started inpection time");

      document.removeEventListener("keypress", _handleTimer_);
      document.addEventListener("keypress", _handleTimer_);

      document.addEventListener("keydown", cancelInspection);
      // mouse (mousedown) like eventlistener
      // document.removeEventListener("mousedown", _handleTimer_);
      // let timer_frame = document.querySelector("#timer-watch-frame");

      // timer_frame.removeEventListener("mouseover", mouseoverHandle);
      // timer_frame.addEventListener("mouseover", mouseoverHandle);

      // timer_frame.removeEventListener("mouseout", mouseoutHandle);
      // timer_frame.addEventListener("mouseout", mouseoutHandle);
      // mouse (mousedown) like eventlistener
      document.removeEventListener("keydown", cancelTimer);

      inspect();

      return () => {
        console.log("removed inpection time");
        document.removeEventListener("keydown", cancelInspection);
        document.removeEventListener("keydown", cancelTimer);

        if (middle_stopped_inspection.current) {
          // timer_frame.removeEventListener("mouseover", mouseoverHandle);
          // timer_frame.removeEventListener("mouseout", mouseoutHandle);
          document.removeEventListener("keypress", _handleTimer_);
        }
      };
    }, []);

    return (
      <>
        {inspection_started && (
          <div className="full-screen timeout-inspection">
            {timeout_inspection}
          </div>
        )}
      </>
    );
  };

  const changedHandleTimer = useCallback((e) => {
    handleTimer(e);
  }, []);

  useEffect(() => {
    let timer_frame = document.querySelector("#timer-watch-frame");

    const mouseoverHandle = () => {
      setClickable(true);
      document.addEventListener("mousedown", changedHandleTimer);
    };

    const mouseoutHandle = () => {
      setClickable(false);
      document.removeEventListener("mousedown", changedHandleTimer);
    };

    if (!setting.enable_inspection_time) {
      console.log("disabled inspection time");
      // key like eventlistener
      document.removeEventListener("keydown", launchInspection);
      document.removeEventListener("keydown", changedHandleTimer);
      document.addEventListener("keydown", changedHandleTimer);
      // key like eventlistener

      // mouse (mousedown) like eventlistener
      // document.removeEventListener("mousedown", changedHandleTimer);

      // timer_frame.removeEventListener("mouseover", mouseoverHandle);
      // timer_frame.addEventListener("mouseover", mouseoverHandle);

      // timer_frame.removeEventListener("mouseout", mouseoutHandle);
      // timer_frame.addEventListener("mouseout", mouseoutHandle);
      // mouse (mousedown) like eventlistener
    } else {
      // timer_frame.removeEventListener("mouseout", mouseoutHandle);
      // timer_frame.removeEventListener("mouseover", mouseoverHandle);

      document.removeEventListener("keydown", changedHandleTimer);
      document.removeEventListener("keydown", launchInspection);
      document.addEventListener("keydown", launchInspection);
    }
  }, [setting.enable_inspection_time]);

  const centiemesecond =
    time_backend.current.centiemesecond < 10
      ? `0${time_backend.current.centiemesecond}`
      : time_backend.current.centiemesecond;
  const s_second = time_backend.current.second + " .";

  return (
    <>
      {inspection_started && <InspectionScreen />}
      <div
        className="timer-watch-panel-container"
        id="timer-watch-frame"
        style={{
          position: setting.full_screen_enabled && started_state && "static",
        }}
      >
        <div
          className="clickable-frame-timer"
          style={{ display: `${clickable ? "block" : "none"}` }}
        >
          {/* <span>&bull;</span> */} CLICKABLE
        </div>
        <div className="scramble-line">
          <span>{scramble}</span>
          <span onClick={newScramble}>
            <i class="fa fa-refresh" aria-hidden="true"></i>
          </span>
        </div>
        <div id="timer-flow">
          {" "}
          {time_screen === "TIME" ? (
            <span
              id="timer-run-screen"
              className={
                setting.full_screen_enabled && started_state && "full-screen"
              }
            >
              {" "}
              0 . 0
            </span>
          ) : time_screen === "S_TIME" ? (
            `${s_second} ${centiemesecond}`
          ) : (
            <span style={{ color: "orange" }}>DNF</span>
          )}{" "}
        </div>
        <div className="timer-options">
          <button
            className="btn-current-time-option"
            id="set-plus-2-current-time"
            data-toggle="tooltip"
            data-placement="left"
            title="set plus 2 the time"
            onClick={plusTwoTime}
          >
            +2
          </button>
          <button
            className="btn-current-time-option"
            id="set-dnf-current-time"
            data-toggle="tooltip"
            data-placement="left"
            title="set DNF the time"
            onClick={setDNFTime}
          >
            DNF
          </button>
          <button
            className="btn-current-time-option"
            id="delete-current-time"
            data-toggle="tooltip"
            data-placement="left"
            title="remove the current time"
            onClick={deleteCurrentTime}
          >
            {" "}
            <i class="fa fa-times" aria-hidden="true"></i>{" "}
          </button>
        </div>
      </div>
    </>
  );
}

export default Index;
