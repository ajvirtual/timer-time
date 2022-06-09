// const addTime = (state, time) => {
//     return {
//         ...state,
//         list_time: state.list_time.unshift(time)
//     }
// }

// const removeLastTime = (state) => {
//     return {
//         ...state,
//         list_time: state.list_time.shift()
//     }
// }

// const calcAo3 = (state) => {
//     let sum3 = 0;
//     let ao3 = 0;
//     for(let i = 0; i < 3; i++) {
//        sum3 += state.list_time[i]
//     }
//     ao3 = sum3/3
//     return {
//         ...state,
//         ao3: ao3
//     }
// }

// const calcAo5 = (state) => {
//     let sum5 = 0;
//     let ao5 = 0;
//     for(let i = 0; i < 5; i++) {
//        sum5 += state.list_time[i]
//     }
//     ao5 = sum5/5
//     return {
//         ...state,
//         ao5: ao5
//     }
// }

// const calcAo12 = (state) => {
//     let sum12 = 0;
//     let ao12 = 0;
//     for(let i = 0; i < 12; i++) {
//        sum12 += state.list_time[i]
//     }
//     ao12 = sum12/12
//     return {
//         ...state,
//         ao12: ao12
//     }
// }

// const calcAo50 = (state) => {
//     let sum50 = 0;
//     let ao50 = 0;
//     for(let i = 0; i < 50; i++) {
//        sum50 += state.list_time[i]
//     }
//     ao50 = sum50/50
//     return {
//         ...state,
//         ao50: ao50
//     }
// }

// const calcAo100 = (state) => {
//     let sum100 = 0;
//     let ao100 = 0;
//     for(let i = 0; i < 100; i++) {
//        sum100 += state.list_time[i]
//     }
//     ao100 = sum100/100
//     return {
//         ...state,
//         ao100: ao100
//     }
// }

// const calcAo1000 = (state) => {
//     let sum1000 = 0;
//     let ao1000 = 0;
//     for(let i = 0; i < 1000; i++) {
//        sum1000 += state.list_time[i]
//     }
//     ao1000 = sum1000/1000
//     return {
//         ...state,
//         ao1000: ao1000
//     }
// }

// const calcBest = (state) => {
//     return {
//         ...state,
//         best_time: Math.max(...state.list_time)
//     }
// }

// const calcWorst = (state) => {
//    return {
//         ...state,
//         worst_time: Math.min(...state.list_time)
//     }
// }

// const calcNumTime = (state) => {
//     return {
//         ...state,
//         num_time: state.list_time.length
//     }
// }

const addTime = (setState, time, scramble) => {
  setState((state) => {
    return {
      ...state,
      // list_time: {time: [time, ...state.list_time.time], scramble: [scramble, ...state.list_time.scramble]}
      list_time: [...state.list_time, time],
      scramble: [...state.scramble, scramble],
    };
  });
};

const removeLastTime = (setState) => {
  setState((state) => {
    return {
      ...state,
      list_time: state.list_time.filter(
        (i, v) => v !== state.list_time.length - 1
      ),
      scramble: state.scramble.filter(
        (i, v) => v !== state.list_time.length - 1
      ),
    };
  });
};

const calcAo3 = (setState) => {
  setState((state) => {
    let sum3 = 0;
    let ao3 = 0;
    if (state.list_time.length >= 3) {
      for (
        let i = state.list_time.length - 1;
        i > state.list_time.length - 4;
        i--
      ) {
        sum3 += state.list_time[i];
      }
      ao3 = Math.floor(sum3 / 3);
    }

    const text_time = timeToString(ao3);

    return {
      ...state,
      ao3: { integer: ao3, text: text_time },
    };
  });
};

const calcAo5 = (setState) => {
  setState((state) => {
    let sum3 = 0;
    let ao5 = 0;
    let top_5_solve = [];
    let max_in_5, min_in_5, list_min_max_removed;

    if (state.list_time.length >= 5) {
      for (
        let i = state.list_time.length - 1;
        i > state.list_time.length - 6;
        i--
      ) {
        top_5_solve.push(state.list_time[i]);
      }
      list_min_max_removed = top_5_solve.splice(
        top_5_solve.indexOf(Math.max(...top_5_solve)),
        1
      );
      list_min_max_removed = top_5_solve.splice(
        top_5_solve.indexOf(Math.min(...top_5_solve)),
        1
      );
      sum3 = top_5_solve.reduce((a, b) => a + b);
      ao5 = Math.floor(sum3 / 3);
      //   const moyenne3_string = (sum3 / 3).toString();
      //   ao5 = parseFloat(
      //     moyenne3_string.slice(0, moyenne3_string.indexOf(".") + 3)
      //   );
    }
    const text_time = timeToString(ao5);
    return {
      ...state,
      ao5: { integer: ao5, text: text_time },
    };
  });
};

const calcAo12 = (setState) => {
  let sum10 = 0;
  let ao12 = 0;
  let top_12_solve = [];
  let max_in_12, min_in_12, list_min_max_removed;
  setState((state) => {
    if (state.list_time.length >= 12) {
      for (
        let i = state.list_time.length - 1;
        i > state.list_time.length - 13;
        i--
      ) {
        top_12_solve.push(state.list_time[i]);
      }
      list_min_max_removed = top_12_solve.splice(
        top_12_solve.indexOf(Math.max(...top_12_solve)),
        1
      );
      list_min_max_removed = top_12_solve.splice(
        top_12_solve.indexOf(Math.min(...top_12_solve)),
        1
      );
      sum10 = top_12_solve.reduce((a, b) => a + b);
      ao12 = Math.floor(sum10 / 12);
    }
    const text_time = timeToString(ao12);

    return {
      ...state,
      ao12: { integer: ao12, text: text_time },
    };
  });
};

const calcAo50 = (setState) => {
  setState((state) => {
    let sum48 = 0;
    let ao50 = 0;
    let top_50_solve = [];
    let max_in_50, min_in_50, list_min_max_removed;
    if (state.list_time.length >= 50) {
      for (
        let i = state.list_time.length - 1;
        i > state.list_time.length - 51;
        i--
      ) {
        top_50_solve.push(state.list_time[i]);
      }
      list_min_max_removed = top_50_solve.splice(
        top_50_solve.indexOf(Math.max(...top_50_solve)),
        1
      );
      list_min_max_removed = top_50_solve.splice(
        top_50_solve.indexOf(Math.min(...top_50_solve)),
        1
      );
      sum48 = top_50_solve.reduce((a, b) => a + b);
      ao50 = Math.floor(sum48 / 50);
    }
    const text_time = timeToString(ao50);

    return {
      ...state,
      ao50: { integer: ao50, text: text_time },
    };
  });
};

const calcAo100 = (setState) => {
  setState((state) => {
    let sum98 = 0;
    let ao100 = 0;
    let top_100_solve = [];
    let max_in_100, min_in_100, list_min_max_removed;
    if (state.list_time.length >= 100) {
      for (
        let i = state.list_time.length - 1;
        i > state.list_time.length - 101;
        i--
      ) {
        top_100_solve.push(state.list_time[i]);
      }

      list_min_max_removed = top_100_solve.splice(
        top_100_solve.indexOf(Math.max(...top_100_solve)),
        1
      );
      list_min_max_removed = top_100_solve.splice(
        top_100_solve.indexOf(Math.min(...top_100_solve)),
        1
      );
      sum98 = top_100_solve.reduce((a, b) => a + b);
      ao100 = Math.floor(sum98 / 100);
    }
    const text_time = timeToString(ao100);

    return {
      ...state,
      ao100: { integer: ao100, text: text_time },
    };
  });
};

const calcAo1000 = (setState) => {
  setState((state) => {
    let sum998 = 0;
    let ao1000 = 0;
    let top_1000_solve = [];
    let max_in_1000, min_in_1000, list_min_max_removed;
    if (state.list_time.length >= 1000) {
      for (
        let i = state.list_time.length - 1;
        i > state.list_time.length - 1001;
        i--
      ) {
        top_1000_solve.push(state.list_time[i]);
      }
      list_min_max_removed = top_1000_solve.splice(
        top_1000_solve.indexOf(Math.max(...top_1000_solve)),
        1
      );
      list_min_max_removed = top_1000_solve.splice(
        top_1000_solve.indexOf(Math.min(...top_1000_solve)),
        1
      );
      sum998 = top_1000_solve.reduce((a, b) => a + b);
      ao1000 = Math.floor(sum998 / 1000);
    }
    const text_time = timeToString(ao1000);

    return {
      ...state,
      ao1000: { integer: ao1000, text: text_time },
    };
  });
};

const calcBest = (setState) => {
  setState((state) => {
    let min = 0;
    let text_time = "";
    if (state.list_time.length) {
      min = Math.min(...state.list_time);
      text_time = timeToString(min);
    } else {
      min = 0;
      text_time = "0.0";
    }
    return {
      ...state,
      best_time: { integer: min, text: text_time },
    };
  });
};

const calcWorst = (setState) => {
  setState((state) => {
    let max = 0;
    let text_time = "";
    if (state.list_time.length) {
      max = Math.max(...state.list_time);
      text_time = timeToString(max);
    } else {
      max = 0;
      text_time = "0.0";
    }
    return {
      ...state,
      worst_time: { integer: max, text: text_time },
    };
  });
};

const calcNumTime = (setState) => {
  setState((state) => {
    return {
      ...state,
      num_time: state.list_time.length,
    };
  });
};

// we have to evaluate the foat value of a time before an aoX calcul so that we avoid any eventual calul imprecision
// const timeToFloat = (time) => {

// }

// timeToString calculate the value of print on the screen, it doesn't contain any calcul
const timeToString = (time) => {
  if (time === 0) {
    return "0.0";
  }
  if (time < 100) {
    // time les than 1 centiemesecond (100 millisecond)
    if (time < 10) {
      // time les than 10 millisecond
      return "0.0" + time;
    }
    return "0." + time;
  }

  const week = Math.floor(time / 60480000),
    day = Math.floor((time % 60480000) / 8640000),
    hour = Math.floor((time % 8640000) / 360000),
    minute = Math.floor((time % 360000) / 6000),
    second = Math.floor((time % 6000) / 100),
    centiemesecond = Math.floor(time % 100);
  const text_week = week === 0 ? "" : week < 10 ? `0${week} : ` : week + " : ",
    text_day =
      day === 0
        ? week > 0
          ? "00 : "
          : ""
        : day < 10
        ? `0${day} : `
        : day + " : ",
    text_hour =
      hour === 0
        ? day > 0
          ? "00 : "
          : ""
        : hour < 10
        ? `0${hour} : `
        : hour + " : ",
    text_minute =
      minute === 0
        ? hour > 0
          ? "00 : "
          : ""
        : minute < 10
        ? `0${minute} : `
        : minute + " : ",
    text_second =
      time < 6000
        ? second + "."
        : second < 10
        ? `0${second} : `
        : second + " : ",
    text_centiemesecond =
      centiemesecond < 10 ? `0${centiemesecond}` : centiemesecond;
  const text_time = `${text_week}${text_day}${text_hour}${text_minute}${text_second}${text_centiemesecond}`;
  return text_time;
};

export {
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
  timeToString,
};
