import React, { useEffect, useRef, useState } from "react";
import { TimeStatContext } from "./../../tools/timerStatProvider";
import { SettingContext } from "./../../tools/settingProvider";
import { timeToString } from "./../../tools/timeStatAction";
import "./leftsidepanel.css";

function Index() {
  const [times, setTimes] = TimeStatContext();
  const [times_list_left, setTimeListLeft] = useState([]);
  const [show_setting, setShowSetting] = useState(false);
  const out_of_bound_var = useRef(0);
  const [setting, setSetting] = SettingContext();
  // input ref
  //   const max_solve_ref = useRef();
  //   const inspection_time_ref = useRef();
  //   const enable_inspect_time_ref = useRef(setting.enable_inspection_time);
  const [input_state, setInputState] = useState({
    max_solve_display: setting.max_solve_display,
    enable_inspection_time: setting.enable_inspection_time,
    inspection_time: setting.inspection_time,
    max_solve_goal: setting.max_solve_goal,
    max_solve_goal_message: setting.max_solve_goal_message,
  });
  // input ref

  const [display_mess_popup, displayMessagePopup] = useState(false); // message popup display flag

  const handleHover = (e, i) => {
    console.log("voici " + i);
  };

  const showSettingPopup = () => {
    setShowSetting(true);
  };

  const handleSwitchChange = (e) => {
    setSetting((s) => {
      return {
        ...s,
        full_screen_enabled: e.target.checked,
      };
    });
  };

  const inputChanged = (e) => {
    if (e.target.type === "checkbox") {
      // console.log(e.target.checked);
      setInputState((s) => {
        return {
          ...s,
          [e.target.name]: e.target.checked,
        };
      });
    } else {
      // console.log(e.target.value);
      setInputState((s) => {
        return {
          ...s,
          [e.target.name]: e.target.value,
        };
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSetting((s) => {
      return {
        ...s,
        max_solve_display: input_state.max_solve_display,
        inspection_time: input_state.inspection_time,
        enable_inspection_time: input_state.enable_inspection_time,
        max_solve_goal: input_state.max_solve_goal,
        max_solve_goal_message: input_state.max_solve_goal_message,
      };
    });
    e.target.id === "ok" && setShowSetting(false);
  };

  const listTimes = () => {
    var list_solve = [];
    // if (times.list_time.length === 6) {
    //   debugger;
    // }
    if (times.list_time.length <= setting.max_solve_display) {
      // INCREMENTAL PUSH ROW DISPLAY
      for (let i = times.list_time.length; i > 0; i--) {
        list_solve.push(
          <tr
            className={
              times.list_time[i]
                ? "time-table-row time-solved"
                : "time-table-row"
            }
          >
            <td className="time-index">{times.list_time.length - i + 1}</td>
            <td className="time-value">
              {timeToString(times.list_time[times.list_time.length - i])}
            </td>
            <div className="edit-time-from-left">
              EDIT <i class="fa fa-edit  "></i>
            </div>
          </tr>
        );
      }
      for (
        let i = 1;
        i < setting.max_solve_display - times.list_time.length + 1;
        i++
      ) {
        list_solve.push(
          <tr
            className={
              times.list_time[i]
                ? "time-table-row time-solved"
                : "time-table-row"
            }
          >
            <td className="time-index">{i + times.list_time.length}</td>
            <td className="time-value">-</td>
            <div className="edit-time-from-left">
              EDIT <i class="fa fa-edit  "></i>
            </div>
          </tr>
        );
      }
    } else {
      for (
        let i = times.list_time.length - out_of_bound_var.current;
        i > 0;
        i--
      ) {
        list_solve.push(
          <tr
            className={
              times.list_time[i]
                ? "time-table-row time-solved"
                : "time-table-row"
            }
          >
            <td className="time-index">{times.list_time.length - i + 1}</td>
            <td className="time-value">
              {timeToString(times.list_time[times.list_time.length - i])}
            </td>
            <div className="edit-time-from-left">
              EDIT <i class="fa fa-edit  "></i>
            </div>
          </tr>
        );
      }
      if (!setting.current_deleted) {
        list_solve.shift();
        out_of_bound_var.current++;
      } else {
        out_of_bound_var.current--;
        setSetting((s) => {
          return { ...s, current_deleted: false };
        });
      }
    }
    setTimeListLeft(list_solve);
    return list_solve;
  };

  useEffect(() => {
    let list_solve = listTimes();
    setTimeListLeft(list_solve);
  }, [times.toogleUpdate, setting.current_deleted]);

  // MESSAGE POPUP PANEL

  const PopupMessagePanel = () => {
    return (
      <>
        <div className="popup-mess-popup-back"></div>
        <div className="popup-mess-goal">
          {setting.max_solve_goal_message}
          <div className="popup-ok-button">
            <button
              onClick={() => {
                displayMessagePopup(false);
                setSetting((s) => {
                  return {
                    ...s,
                    max_solve_goal: Math.ceil(s.max_solve_goal * 1.5),
                  };
                });
              }}
            >
              OK
            </button>
          </div>
        </div>
      </>
    );
  };

  useEffect(() => {
    parseInt(setting.max_solve_goal) === times.list_time.length &&
      displayMessagePopup(true);

    // console.log(setting.max_solve_goal);
    // console.log(times.list_time.length);
    // console.log(setting.max_solve_goal === times.list_time.length);
  }, [times.list_time, setting.max_solve_goal, setting.max_solve_goal_message]);
  // dependencies : times.list_time, setting.max_solve_goal, setting.max_solve_goal_message;
  return (
    <>
      <div className="left-side-panel-container">
        <div className="setting" onClick={showSettingPopup}>
          <span>
            <i className="fa fa-cog" aria-hidden="true"></i>
          </span>
        </div>
        <div className="full-screen-setting">
          <span>full screen</span>
          <span>
            <label
              className="switch"
              data-toggle="tooltip"
              data-placement="left"
              title="enable full screen"
            >
              <input
                type="checkbox"
                id="full-screen-switch"
                checked={setting.full_screen_enabled}
                onChange={handleSwitchChange}
              />
              <span className="slider round"></span>
            </label>
          </span>
        </div>
        <div className="list-solve">
          <div className="see-full-time-list">
            full time list <i className="fa fa-list" aria-hidden="true"></i>
          </div>
          <div className="sumar-time-list">
            <table>
              <thead>
                <td>number</td>
                <td>time solved</td>
              </thead>
              {/* {times_list_left.length ? times_list_left : empty_list} */}
              {times_list_left}
            </table>
          </div>
        </div>
      </div>
      {show_setting && (
        <>
          <div id="setting-popup">
            <div id="setting-header">
              <span>SETTING PANNEL</span>
              <span id="dispose-setting" onClick={() => setShowSetting(false)}>
                <i class="fa fa-times" aria-hidden="true"></i>
              </span>
            </div>
            <div id="setting-main">
              <form id="setting-form">
                <div className="form-group-inline">
                  <span>max solve list to display on the left panel</span>
                  <input
                    type="number"
                    name="max_solve_display"
                    id="max-solve-display"
                    // placeholder={setting.max_solve_display}
                    // ref={max_solve_ref}
                    value={input_state.max_solve_display}
                    onChange={inputChanged}
                  />
                </div>
                <div className="form-group-inline">
                  <span>enable inspection time</span>
                  <span>
                    <label
                      className="switch"
                      data-toggle="tooltip"
                      data-placement="left"
                      title="enable inspection time"
                    >
                      <input
                        type="checkbox"
                        name="enable_inspection_time"
                        id="enable-inspection-time"
                        checked={input_state.enable_inspection_time}
                        onChange={inputChanged}
                        // value={input_state.enable_inspection_time}
                        // onChange={(e) => {
                        //   enable_inspect_time_ref.current = !enable_inspect_time_ref.current;
                        //   setSetting((s) => {
                        //     return {
                        //       ...s,
                        //       enable_inspection_time: !enable_inspect_time_ref.current,
                        //     };
                        //   });
                        // }}
                      />
                      <span className="slider round"></span>
                    </label>
                  </span>
                </div>
                <div className="form-group-inline">
                  <span>set inspection time</span>
                  <input
                    type="number"
                    name="inspection_time"
                    id="inspection-time"
                    value={input_state.inspection_time}
                    onChange={inputChanged}
                    // ref={inspection_time_ref}
                    // placeholder={setting.inspection_time}
                  />
                </div>
                <div className="form-group-inline">
                  <span>specify max solve goal</span>
                  <input
                    type="number"
                    name="max_solve_goal"
                    id="max-solve-goal"
                    value={input_state.max_solve_goal}
                    onChange={inputChanged}
                    // ref={inspection_time_ref}
                    // placeholder={setting.inspection_time}
                  />
                </div>
                <div className="form-group-inline">
                  <span>max solve goal message </span>
                  <textarea
                    name="max_solve_goal_message"
                    id="max-solve-goal-message"
                    value={input_state.max_solve_goal_message}
                    onChange={inputChanged}
                    // ref={inspection_time_ref}
                    // placeholder={setting.inspection_time}
                  ></textarea>
                </div>
                {/* <div className="form-group-inline">
                  <span>max solve list to display on the left panel</span>
                  <input
                    type="number"
                    name="max-solve-list"
                    id="max-solve-list"
                  />
                </div> */}
                <div id="setting-btns">
                  <button type="submit" onClick={handleSubmit} id="ok">
                    OK
                  </button>
                  <button type="submit" onClick={handleSubmit}>
                    apply
                  </button>
                  <button onClick={() => setShowSetting(false)}>close</button>
                </div>
              </form>
            </div>
          </div>
          s<div id="back-popup"></div>
        </>
      )}
      {display_mess_popup && <PopupMessagePanel />}
    </>
  );
}

export default Index;
