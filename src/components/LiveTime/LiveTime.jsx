import React, { useState, useEffect } from 'react'

export default function LiveTime() {
  const [currentTime, setCurrentTime] = useState(new Date())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000)

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [])

  const formattedTime = currentTime.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })

  return (
    <>{formattedTime}</>
  )
}


