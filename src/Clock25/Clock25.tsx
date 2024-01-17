import React, { useEffect, useState, useRef } from "react";
import styles from './Clock25.module.css';

const Clock25: React.FC<{}> = () => {
    let timerRef = useRef<NodeJS.Timer | null>();
    let timerLeftRef = useRef<any>();
    let beepRef = useRef<any>();
    const defaultBreakTime = 5;
    const defaultSessionTime = 25;
    const [breakTime, setBreakTime] = useState(defaultBreakTime);
    const [sessionTime, setSessionTime] = useState(defaultSessionTime);
    const [timeLeft, setTimeLeft] = useState(0);
    const [timerRunning, setTimerRunning] = useState(false);
    const [timerTitle, setTimerTitle] = useState("Session");

    useEffect(() => {
        // timerLeftRef = document.getElementById('time-left');
        // beepRef = document.getElementById('beep');
        if (timerRunning) {
            timerRef.current = setInterval(() => {
                setTimeLeft(prevTimeLeft => {
                    if (prevTimeLeft === 0) {
                        beepRef.current?.play();
                        if (timerTitle === 'Session') {
                            setTimerTitle(prevTimerTitle => prevTimerTitle === 'Session' ? 'Break' : 'Session');
                            return breakTime * 60;
                        } else {
                            setTimerTitle(prevTimerTitle => prevTimerTitle === 'Break' ? 'Session' : 'Break');
                            return sessionTime * 60;
                        }
                    }
                    return prevTimeLeft - 1
                });
            }, 1000);
            return (() => {
                if (timerLeftRef) clearInterval(timerLeftRef.current);
            });
        }
    }, [timerRunning])

    const startTimer = (times: React.SetStateAction<number>) => {
        setTimeLeft(times);
        setTimerRunning(true);
    }

    const stopTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            setTimerRunning(false);
        }
    }

    const resetTimer = () => {
        if (timerRef.current) {
            clearInterval(timerRef.current);
            beepRef.current.pause();
            beepRef.current.currentTime = 0;
        }

        timerRef.current = null;
        setBreakTime(defaultBreakTime);
        setSessionTime(defaultSessionTime);
        setTimerTitle('Session');
        setTimeLeft(defaultSessionTime * 60);
        setTimerRunning(false);
    };

    const timeLengthUpdated = (title: string, action: number) => {
        if (timerTitle === 'Session') {
            if (title === 'session') {
                setTimeLeft((sessionTime + action) * 60);
            }
        } else {

            if (title === 'break') {
                setTimeLeft((breakTime + action) * 60);
            }
        }
    };

    const getTimeInMin = () => {
        let seconds = timeLeft > 0 ? timeLeft : (timerRunning ? 0 : (sessionTime * 60));
        let mins = Math.floor(seconds / 60);
        let sec = seconds % 60;
        return `${mins < 10 ? '0' : ''}${mins}:${sec < 10 ? '0' : ''}${sec}`;
    }
    return (
        <div className={styles.clockApp}>
            <div className={styles.appHeader}>
                <div className={styles.title}>25 + 5 Clock</div>
            </div>
            <div className={styles.clockWrapper}>
                <div className={styles.clock}>
                    <div className={styles.control}>
                        <div className={styles.breakControl}>
                            <div id="break-label" className={styles.breakLabel}>Break Length</div>
                            <button id="break-decrement" disabled={timerRunning || breakTime <= 1} onClick={() => { setBreakTime(breakTime - 1); timeLengthUpdated('session', -1) }} className={`${styles.incDec} ${styles.button}`}><i className="fa fa-arrow-down"></i></button>
                            <div id="break-length" className={styles.breakLength}>{breakTime}</div>
                            <button id="break-increment" disabled={timerRunning || breakTime >= 60} onClick={() => { setBreakTime(breakTime + 1); timeLengthUpdated('break', 1) }} className={`${styles.incDec} ${styles.button}`}><i className="fa fa-arrow-up"></i></button>
                        </div>
                        <div className={styles.sessionControl}>
                            <div id="session-label" className={styles.sessionLabel}>Session Length</div>
                            <button id="session-decrement" disabled={timerRunning || sessionTime <= 1} onClick={() => { setSessionTime(sessionTime - 1); timeLengthUpdated('session', -1) }} className={`${styles.incDec} ${styles.button}`}><i className="fa fa-arrow-down"></i></button>
                            <div id="session-length" className={styles.sessionLength}>{sessionTime}</div>
                            <button id="session-increment" disabled={timerRunning || sessionTime >= 60} onClick={() => { setSessionTime(sessionTime + 1); timeLengthUpdated('session', 1) }} className={`${styles.incDec} ${styles.button}`}><i className="fa fa-arrow-up"></i></button>
                        </div>
                    </div>
                    <div className={styles.timer}>
                        <div className={styles.timerWrapper}>
                            <div id="timer-label" className={timeLeft < 60 ? `${styles.timerEnding} ${styles.timerLabel}` : `${styles.timerLabel}`}>{timerTitle}</div>
                            <div id="time-left" ref={timerLeftRef} className={timeLeft < 60 ? `${styles.timerEnding} ${styles.timeLeft}` : `${styles.timeLeft}`}>{getTimeInMin()}</div>
                        </div>
                    </div>
                    <div className={styles.timerControls}>
                        {timerRunning ? <button id="start_stop" className={`${styles.start_stop} ${styles.button}`} onClick={() => stopTimer()}><i className="fa fa-pause"></i></button> : <button id="start_stop" className={`${styles.start_stop} ${styles.button}`} onClick={() => startTimer(timeLeft > 0 ? timeLeft : (sessionTime * 60))}><i className="fa fa-play"></i></button>}
                        <button id="reset" className={`${styles.reset} ${styles.button}`} onClick={() => resetTimer()}><i className="fa fa-refresh"></i></button>
                    </div>
                    <div className={styles.author}>
                        <p>Design & Developed by</p>
                        <p><a href="https://www.linkedin.com/in/divyesh-badrakiya" rel="noreferrer" target="_blank">Divyesh Badrakiya</a></p>
                    </div>
                    <audio id="beep" ref={beepRef} preload="auto" src="https://cdn.freecodecamp.org/testable-projects-fcc/audio/BeepSound.wav"></audio>
                </div>
            </div>
        </div>
    );
}
export default Clock25;