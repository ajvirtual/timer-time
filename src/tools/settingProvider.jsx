import React, { createContext, useContext, useState } from "react";

const Context = createContext(null); // THE CONTEXT

function SettingProvider({ children }) {
  const [setting, setSetting] = useState({
    full_screen_enabled: false,
    max_solve_display: 12,
    enable_inspection_time: false,
    inspection_time: 15,
    current_deleted: false,
    max_solve_goal_message:
      "vous avez atteint 10 solve vous croyez pas que ca suffit pour  aujourd'hui vous croyez pas !! :)",
    max_solve_goal: 10,
  });

  return (
    <Context.Provider value={[setting, setSetting]}>
      {children}
    </Context.Provider>
  );
}

const SettingContext = () => useContext(Context);
export { SettingContext };
export default SettingProvider;
