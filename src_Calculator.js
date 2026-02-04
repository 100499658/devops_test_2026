import React, { useState } from 'react';
import './Calculator.css';

const buttons = [
  'C', 'DEL', '÷', 
  '7', '8', '9', '×',
  '4', '5', '6', '-',
  '1', '2', '3', '+',
  '0', '.', '='
];

export default function Calculator() {
  const [expr, setExpr] = useState('');
  const [result, setResult] = useState('');

  const push = (val) => {
    if (val === 'C') {
      setExpr('');
      setResult('');
      return;
    }
    if (val === 'DEL') {
      setExpr((s) => s.slice(0, -1));
      return;
    }
    if (val === '=') {
      calculate();
      return;
    }
    setExpr((s) => s + val);
  };

  const calculate = () => {
    if (!expr) return;
    try {
      // Reemplazamos símbolos por operadores JS válidos
      const safe = expr.replace(/×/g, '*').replace(/÷/g, '/');
      // Nota: Function() se usa aquí por simplicidad; no ejecutar con entradas no confiables en producción.
      // Alternativa en producción: parsear la expresión con una librería mathjs o escribir un parser.
      const evalResult = Function(`return (${safe})`)();
      setResult(String(evalResult));
    } catch (e) {
      setResult('Error');
    }
  };

  return (
    <div className="calculator">
      <div className="display">
        <div className="expression">{expr || '0'}</div>
        <div className="result">{result}</div>
      </div>
      <div className="buttons">
        {buttons.map((b) => (
          <button
            key={b}
            className={`btn ${b === '=' ? 'equal' : ''}`}
            onClick={() => push(b)}
          >
            {b}
          </button>
        ))}
      </div>
    </div>
  );
}