import React, { useReducer, createContext, useContext, useState } from "react";
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
} from "./timeStatAction";

// const time_stat_action = {
//     'ADD_TIME': 0,
//     'CALC_AO3': 1,
//     'CALC_AO5': 2,
//     'CALC_AO12': 3,
//     'CALC_AO50': 4,
//     'CALC_AO100': 5,
//     'CALC_AO1000': 6,
//     'CALC_BEST': 7,
//     'CALC_WORST': 8,
//     'CALC_NUM_SOLVE': 9,
//     'REMOVE_LAST_TIME': 10
// }

// const timer_reducer = (state, action) => {
//     switch (action.type) {
//         case time_stat_action.ADD_TIME:
//             addTime(state, action.current_time)
//             break;
//         case time_stat_action.REMOVE_LAST_TIME:
//             removeLastTime(state)
//             break;
//         case time_stat_action.CALC_AO3:
//             calcAo3(state)
//             break;
//         case time_stat_action.CALC_AO5:
//             calcAo5(state)
//             break;
//         case time_stat_action.CALC_AO12:
//             calcAo12(state)
//             break;
//         case time_stat_action.CALC_AO50:
//             calcAo50(state)
//             break;
//         case time_stat_action.CALC_AO100:
//             calcAo100(state)
//             break;
//         case time_stat_action.CALC_AO1000:
//             calcAo1000(state)
//             break;
//         case time_stat_action.CALC_BEST:
//             calcBest(state)
//             break;
//         case time_stat_action.CALC_WORST:
//             calcWorst(state)
//             break;
//         case time_stat_action.CALC_NUM_SOLVE:
//             calcNumTime(state)
//             break;
//         default:
//             return state;
//     }
// }

// const initalvalue = { // INITIAL VALUES
//    list_time: [],
//    ao3: 9.52,
//    ao5: 8.14,
//    ao12: 55,
//    ao50: 0,
//    ao100: 0,
//    ao1000: 0,
//    best_time: 55,
//    worst_time: 4,
//    num_time: 23
// }

const Context = createContext(null); // THE CONTEXT

function TimeStatProvider({ children }) {
  const [state, setState] = useState({
    list_time: [],
    scramble: [],
    ao3: { integer: 0, text: "0.0" },
    ao5: { integer: 0, text: "0.0" },
    ao12: { integer: 0, text: "0.0" },
    ao50: { integer: 0, text: "0.0" },
    ao100: { integer: 0, text: "0.0" },
    ao1000: { integer: 0, text: "0.0" },
    best_time: { integer: 0, text: "0.0" },
    worst_time: { integer: 0, text: "0.0" },
    num_time: 0,
    toogleUpdate: false,
  });

  return (
    // <Context.Provider value={useReducer(timer_reducer, initalvalue)}>
    //     {children}
    // </Context.Provider>
    <Context.Provider value={[state, setState]}>{children}</Context.Provider>
  );
}

const TimeStatContext = () => useContext(Context);
export { TimeStatContext };
export default TimeStatProvider;
