import React from "react";
import Die from "./Die";
import diceRollSound from "./assets/dice-roll.mp3";
import celebrationSound from "./assets/celebration.mp3";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

export default function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [rollCount, setRollCount] = React.useState(0);
  const [bestScore, setBestScore] = React.useState(
    localStorage.getItem("bestScore") || Infinity
  );
  const [tenzies, setTenzies] = React.useState(false);
  const [disabled, setDisabled] = React.useState(false);

  React.useEffect(() => {
    const allHeld = dice.every((die) => die.isHeld);
    const firstValue = dice[0].value;
    const allSameValue = dice.every((die) => die.value === firstValue);
    if (allHeld && allSameValue) {
      setTenzies(true);
      new Audio(celebrationSound).play();
    } else {
      setDisabled(allHeld);
    }
  }, [dice]);

  React.useEffect(() => {
    if (tenzies && rollCount < bestScore) {
      setBestScore(rollCount);
      localStorage.setItem("bestScore", rollCount);
    }
    if (!tenzies) {
      setRollCount(0);
    }
  }, [tenzies]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function rollDice() {
    new Audio(diceRollSound).play();
    if (!tenzies) {
      setDice((oldDice) =>
        oldDice.map((die) => {
          return die.isHeld ? die : generateNewDie();
        })
      );
      setRollCount((oldRollCount) => oldRollCount + 1);
    } else {
      setTenzies(false);
      setDice(allNewDice());
    }
  }

  function holdDice(id) {
    setDice((oldDice) =>
      oldDice.map((die) => {
        return die.id === id ? { ...die, isHeld: !die.isHeld } : die;
      })
    );
  }

  const diceElements = dice.map((die) => (
    <Die
      key={die.id}
      value={die.value}
      isHeld={die.isHeld}
      holdDice={() => holdDice(die.id)}
    />
  ));

  return (
    <main>
      {tenzies && (
        <Confetti
          colors={[
            "#e11d48",
            "#b4173a",
            "#87112b",
            "#5a0c1d",
            "#2d060e",
            "#e74a6d",
            "#ed7791",
            "#f3a5b6",
            "#f9d2da",
            "#cb1a41",
            "#9e1432",
            "#710f24",
            "#430916",
            "#e4345a",
            "#ea617f",
            "#f08ea4",
            "#f6bbc8",
          ]}
        />
      )}
      <h1 className="title">Tenzio</h1>
      <p className="instructions">
        Roll until all dice are the same. Click each die to freeze it at its
        current value between rolls.
      </p>
      <div className="dice-container">{diceElements}</div>
      <button className="roll-dice" onClick={rollDice} disabled={disabled}>
        {tenzies ? "New Game" : "Roll"}
      </button>
      <div className="roll-count">
        <p>Roll Count → {rollCount}</p>
        <p>{bestScore !== Infinity ? `Best Score → ${bestScore}` : "•••"}</p>
      </div>
    </main>
  );
}
