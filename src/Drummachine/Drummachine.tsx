import React, { useState, useEffect, useRef, useCallback } from 'react';
import styles from './Drummachine.module.css'

const DrumMachine: React.FC<{}> = () => {
    let [volume, setVolume] = useState(0.3);
    let pressedKey: any;
    let displayRef = useRef<any>(null);

    const keyBoardEvent = useCallback((event: any) => {
        if (["q", "Q", "w", "W", "e", "E", "a", "A", "s", "S", "d", "D", "z", "Z", "x", "X", "c", "C"].includes(event.key)) {
            pressedKey = document.getElementById(event.key.toUpperCase());
            pressedKey.play();
        }
    }, [])

    const mouseEvent = useCallback((event: any) => {
        let targetId = event.target.getAttribute("id");
        if (displayRef.current && targetId) {
            displayRef.current.innerHTML = targetId.replace('-', ' ');
            pressedKey = document.getElementById(targetId);
            if (pressedKey.children[0] instanceof Audio) {
                pressedKey.children[0].play();
            }
        }
    }, []);

    useEffect(() => {
        document.addEventListener('keypress', keyBoardEvent, false);
        document.addEventListener('click', mouseEvent, false);
        return () => {
            document.removeEventListener('keypress', keyBoardEvent, false);
            document.removeEventListener('click', mouseEvent, false);
        };
    }, [keyBoardEvent, mouseEvent]);

    const volumeChange = () => {
        let allAudios: any = document.querySelectorAll('audio');
        for (let a of allAudios) {
            let audioEle: any = document.getElementById(a.getAttribute('id'))
            if (audioEle) {
                audioEle.volume = volume;
            }
        }
    }
    return (
        <div className={styles.drumMachineApp}>
            <div className={styles.drumMachineHeader}>
                <h1>Drum Machine</h1>
            </div>
            <div className={styles.drumWrapper}>
                <div id="drum-machine" className={styles.drumMachine}>
                    <div className={styles.drumPads}>
                        <div id="Heater-1" className={styles.drumPad}>
                            <audio id="Q" className="clip" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"></audio>
                            Q
                        </div>
                        <div id="Heater-2" className={styles.drumPad}>
                            <audio id="W" className="clip" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"></audio>
                            W
                        </div>
                        <div id="Heater-3" className={styles.drumPad}>
                            <audio id="E" className="clip" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"></audio>
                            E
                        </div>
                        {false ?
                            <><div className={`${styles.drumPad} ${styles.transparent}`}></div>
                                <div className={`${styles.drumPad} ${styles.transparent}`}></div></> : null}
                        <div id="Heater-4" className={styles.drumPad}>
                            <audio id="A" className="clip" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"></audio>
                            A
                        </div>
                        <div id="Clap" className={styles.drumPad}>
                            <audio id="S" className="clip" src="https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"></audio>
                            S
                        </div>
                        <div id="Open-HH" className={styles.drumPad}>
                            <audio id="D" className="clip" src="https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"></audio>
                            D
                        </div>
                        {false ?
                            <><div className={`${styles.drumPad} ${styles.transparent}`}></div>
                                <div className={`${styles.drumPad} ${styles.transparent}`}></div></> : null}
                        <div id="Kick-n'-Hat" className={styles.drumPad}>
                            <audio id="Z" className="clip" src="https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"></audio>
                            Z
                        </div>
                        <div id="Kick" className={styles.drumPad}>
                            <audio id="X" className="clip" src="https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"></audio>
                            X
                        </div>
                        <div id="Closed-HH" className={styles.drumPad}>
                            <audio id="C" className="clip" src="https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"></audio>
                            C
                        </div>
                    </div>
                    <div className={styles.controls}>
                        <div id="logo" className={styles.logo}>
                            Drum
                        </div>
                        <div>
                            <p id="display" className={styles.display} ref={displayRef}></p>
                        </div>
                        <div id="volume" className={styles.volume}>
                            <input type="range" min="0" max="1" step="0.01" value={volume} onChange={(e) => { volumeChange(); setVolume(Number(e.target.value)); }} />
                        </div>
                    </div>
                </div>|
            </div>
        </div>
    );
}

export default DrumMachine;