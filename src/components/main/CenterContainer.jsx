import React from 'react'
import TimerWatchPanel from './../../components/main/TimerWatchPanel'
import TimeStatPanel from './../../components/main/TimeStatPanel'
import './center-container.css'

function CenterContainer() {
    return (
        <div className="extra-center-container">
            <TimerWatchPanel/>         
            <TimeStatPanel/>         
        </div>
    )
}

export default CenterContainer
