import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [targetNumber, setTargetNumber] = useState(0);
  const [userGuess, setUserGuess] = useState('');
  const [bidPrice, setBidPrice] = useState('');
  const [result, setResult] = useState('');
  const [attempts, setAttempts] = useState(0);
  const [balance, setBalance] = useState(100); // Initial balance

  useEffect(() => {
    generateTargetNumber();
  }, []);

  const generateTargetNumber = () => {
    const luckyNumber = Math.random() < 0.0005; // 1 in 2000 chance
    setTargetNumber(luckyNumber ? Math.floor(Math.random() * 30) + 1 : Math.floor(Math.random() * 30) + 1);
  };

  const handleInputChange = (e, setState) => {
    setState(e.target.value);
  };

  const handleAddBalance = () => {
    // Simulate adding balance (in a real app, this would involve a payment gateway)
    setBalance(balance + 50);
  };

  const handleWithdraw = () => {
    // Simulate withdrawing balance (in a real app, this would involve a payout process)
    if (balance >= 50) {
      setBalance(balance - 50);
    }
  };

  const handleGuess = () => {
    const guess = parseInt(userGuess, 10);
    const price = parseFloat(bidPrice);

    if (isNaN(guess) || guess < 1 || guess > 30 || isNaN(price) || price <= 0) {
      setResult('Invalid input. Please enter a valid number and bid price.');
      return;
    }

    setAttempts(attempts + 1);

    if (guess === targetNumber) {
      const winnings = price * 2;
      setBalance(balance + winnings);
      setResult(`Congratulations! You guessed the correct number ${targetNumber} in ${attempts} attempts. Your bid price: $${price.toFixed(2)}. Your current balance: $${(balance + winnings).toFixed(2)}`);
    } else {
      setBalance(balance - price);
      setResult(`Incorrect. Try again! Your bid price: $${price.toFixed(2)}. Your current balance: $${(balance - price).toFixed(2)}`);
    }

    generateTargetNumber();
    setUserGuess('');
    setBidPrice('');
  };

  return (
    <div className="App">
      <h1>No Prediction Game</h1>
      <p>Try to guess the number between 1 and 30.</p>
      <div>
        <p>Balance: ${balance.toFixed(2)}</p>
        <button onClick={handleAddBalance}>Add Balance</button>
        <button onClick={handleWithdraw}>Withdraw $50</button>
      </div>
      <div>
        <input
          type="text"
          placeholder="Enter your guess"
          value={userGuess}
          onChange={(e) => handleInputChange(e, setUserGuess)}
        />
        <input
          type="number"
          placeholder="Enter your bid price"
          value={bidPrice}
          onChange={(e) => handleInputChange(e, setBidPrice)}
        />
        <button onClick={handleGuess}>Guess</button>
      </div>
      <p>{result}</p>
    </div>
  );
}

export default App;
