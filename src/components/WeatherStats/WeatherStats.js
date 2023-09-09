import { useState, useEffect } from 'react'

export default function WeatherStats({ weatherStats }) {
    
    return (
        <div>
            {weatherStats.map((each, idx) => <p key={idx}>{each.Date}</p>)}
        </div> 
    )
}