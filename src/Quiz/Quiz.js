import React, { useEffect, useState, useCallback } from 'react';
import { que_ans } from './Que_Ans';
// import clock from '../images/clock.jpg';
import './Quiz.css';

const Quiz = () => {
    const [que, setQue] = useState(1);
    const [timer, setTimer] = useState(30);
    const [disable, setDisable] = useState(false);
    const [score, setScore] = useState(0);
    const [finish, setFinish] = useState(false);
    const finalQue = 10;

    const onHandleClick = (opt, data, color) => {
        if (opt === data.correct) {
            document.getElementById(color).style.backgroundColor = 'green';
            setScore(score + 1);
        } else {
            document.getElementById(color).style.backgroundColor = 'red';
        }
        setDisable(true);
    }

    const handleQue = useCallback(() => {
        setQue(que + 1);
        setTimer(30);
    }, [que]);

    const handleNext = useCallback(() => {
        if (que < finalQue) {
            setDisable(false);
            handleQue();
        } else {
            setFinish(true);
            setTimer(0);
        }
    }, [que, handleQue]);

    useEffect(() => {
        let timeout;
        if (timer === 0 && que <= finalQue) {
            handleNext();
        }
        if (timer > 0) {
            timeout = setTimeout(() => {setTimer(timer - 1)}, 1000);
        }
        return () => clearTimeout(timeout);
    }, [handleNext, timer, que]);

    return(
        <div style={{margin: '50px'}}>
            {finish ? <div>Score: {score} </div> :
                <div>
                    <h3>Question {que}/{finalQue}:</h3>
                    <div>
                        <div /* className='clockTimer' */ style={{float: 'right', /* backgroundImage: `url(${clock})` */}}>
                            00:{ timer >= 10 ? timer : `0${timer}` }
                        </div>
                        <div>{que_ans.map((q) => { return( q.id === que ?
                            <div key={q.id}>
                                <p>{q.que}</p>
                                <button id='opt0' onClick={() => onHandleClick(q.option[0], q, 'opt0')} disabled={disable}>{q.option[0]}</button>
                                <button id='opt1' onClick={() => onHandleClick(q.option[1], q, 'opt1')} disabled={disable}>{q.option[1]}</button>
                                <button id='opt2' onClick={() => onHandleClick(q.option[2], q, 'opt2')} disabled={disable}>{q.option[2]}</button>
                                <button id='opt3' onClick={() => onHandleClick(q.option[3], q, 'opt3')} disabled={disable}>{q.option[3]}</button>
                            </div> : null)})}
                        </div>
                    </div>
                </div>
            }
            {que < finalQue ?
                <button onClick={handleNext} disabled={!disable}>Next</button> : 
                !finish ? <button onClick={handleNext} disabled={!disable}>Finish</button> : null
            }
        </div>
    );
}

export default Quiz;
