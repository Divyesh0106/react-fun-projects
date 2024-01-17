import React, { useState } from "react";
import styles from './Calculator.module.css';

const Calculator: React.FC<{}> = () => {
    const [expression, setExpression] = useState("");
    const [result, setResult] = useState("0");

    const formatNumberWithPrecision = (number: number) => {
        if (Number.isInteger(number)) {
            return number.toString();
        } else {
            return `${parseFloat(number.toFixed(4))}`;
        }
    }

    const keyPress = (keyValue: string) => {
        if (keyValue === 'clear') {
            setExpression('');
            setResult('0');
        } else {
            if (expression.includes('=')) {
                if (["+", "-", "*", "/"].includes(keyValue)) {
                    setExpression(`${result}${keyValue}`);
                } else {
                    setExpression(`${keyValue}`);
                }
            } else if (keyValue === '=') {
                if (expression !== "") {
                    setResult(`${formatNumberWithPrecision(eval(expression))}`);
                    setExpression(`${expression}=${formatNumberWithPrecision(eval(expression))}`);
                }
            } else {
                if (['*', '/', '+', '-'].includes(expression[expression.length - 1]) && ['*', '/', '+'].includes(keyValue)) {
                    if (expression[expression.length - 1] === '-' && ['*', '/', '+'].includes(expression[expression.length - 2])) {
                        setExpression(`${expression.slice(0, expression.length - 2)}${keyValue}`);
                    } else {
                        setExpression(`${expression.slice(0, expression.length - 1)}${keyValue}`);
                    }
                    if (expression[expression.length - 1] !== '-') {
                        setResult(keyValue);
                    }
                } else if (expression[expression.length - 1] === '-' && keyValue === '-') {
                    // if (['*','/','+','-'].includes(expression[expression.length-2])) {
                    setExpression(`${expression}`);
                    setResult(keyValue);
                    // } else {
                    //   setExpression(`${expression}${keyValue}`);
                    //   setResult(keyValue);
                    // }
                } else if ((result.includes('.') || expression[expression.length - 1] === '.') && keyValue === '.') {
                    setExpression(`${expression}`);
                } else {
                    setExpression(`${expression}${keyValue}`);
                    if (['+', '-', '*', '/'].includes(keyValue) || ['+', '-', '*', '/',].includes(expression[expression.length - 1]) || result === '0') {
                        setResult(keyValue);
                    } else {
                        setResult(`${result}${keyValue}`);
                    }
                }
            }
        }
    }

    return (
        <div className={styles.calculatorApp}>
            <div className={styles.calculatorHeader}>
                Calculator
            </div>
            <div className={styles.calculatorWrapper}>
                <table className={styles.container} border={0} cellSpacing={0}>
                    <tr className={styles.displayOuter}>
                        <td colSpan={4}>
                            <p id="expression" className={`${styles.alignRight} ${styles.small} ${styles.expression}`}>{expression}</p>
                            <p id="display" className={`${styles.alignRight} ${styles.display}`}>{result}</p>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}><button className={styles.button} id="clear" onClick={() => keyPress('clear')}>AC</button></td>
                        <td><button className={styles.button} id="divide" onClick={() => keyPress('/')}>/</button></td>
                        <td><button className={styles.button} id="multiply" onClick={() => keyPress('*')}>x</button></td>
                    </tr>
                    <tr>
                        <td><button className={styles.button} id="seven" onClick={() => keyPress('7')}>7</button></td>
                        <td><button className={styles.button} id="eight" onClick={() => keyPress('8')}>8</button></td>
                        <td><button className={styles.button} id="nine" onClick={() => keyPress('9')}>9</button></td>
                        <td><button className={styles.button} id="subtract" onClick={() => keyPress('-')}>-</button></td>
                    </tr>
                    <tr>
                        <td><button className={styles.button} id="four" onClick={() => keyPress('4')}>4</button></td>
                        <td><button className={styles.button} id="five" onClick={() => keyPress('5')}>5</button></td>
                        <td><button className={styles.button} id="six" onClick={() => keyPress('6')}>6</button></td>
                        <td><button className={styles.button} id="add" onClick={() => keyPress('+')}>+</button></td>
                    </tr>
                    <tr>
                        <td><button className={styles.button} id="one" onClick={() => keyPress('1')}>1</button></td>
                        <td><button className={styles.button} id="two" onClick={() => keyPress('2')}>2</button></td>
                        <td><button className={styles.button} id="three" onClick={() => keyPress('3')}>3</button></td>
                        <td id="equals-cell" rowSpan={2} style={{ 'height': '100%' }}><button className={styles.button} id="equals" style={{ 'height': '100%' }} onClick={() => keyPress('=')}>=</button></td>
                    </tr>
                    <tr>
                        <td colSpan={2}><button className={styles.button} id="zero" onClick={() => keyPress('0')}>0</button></td>
                        <td><button className={styles.button} id="decimal" onClick={() => keyPress('.')}>.</button></td>
                    </tr>
                </table>
                <div className={styles.createdBy}>
                    <p>Created by </p>
                    <p><a href="https://www.linkedin.com/in/divyesh-badrakiya" rel="noreferrer" target="_blank">Divyesh Badrakiya</a></p>
                </div>
            </div>
        </div>
    );
}
export default Calculator;