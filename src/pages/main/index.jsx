import React from 'react'
import LeftPanel from './../../components/leftsidepanel'
import CenterContainer from './../../components/main/CenterContainer';
import './main.css'
import TimeStatProvider from './../../tools/timerStatProvider';
import SettingProvider from './../../tools/settingProvider';

function index() {
    return (    
        <SettingProvider>
            <TimeStatProvider>
                <div className="extra-main-container">
                    <LeftPanel/>
                    <CenterContainer/>
                </div>
            </TimeStatProvider>
        </SettingProvider>
    )
}

export default index