import { useState, useCallback, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState('');
  const passwordRef = useRef(null);

  const passwordGenerator = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

    if (numberAllowed) str += '0123456789';
    if (charAllowed) str += '!@#$%^&*(){}+=~';

    for (let i = 0; i < length; i++) { // Changed to < length to generate correct length
      let char = Math.floor(Math.random() * str.length);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed]);

  const copyPasswordToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password);
  }, [password]);

  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div style={{
        fontSize: '1.5em',
        width: '100%',
        maxWidth: '28rem',
        margin: '2rem auto',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)',
        borderRadius: '0.5rem',
        padding: '1rem',
        color: '#000',
        backgroundColor: '#6B7280'
      }}>
        Password Generator
        <div style={{ display: 'flex', boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.5)', borderRadius: '4px', overflow: 'hidden', marginBottom: '14px' }}>
          <input 
            type="text"
            value={password}
            placeholder='password'
            ref={passwordRef}
            readOnly // Added readOnly to prevent manual input
            style={{
              flex: 1,
              padding: '15px',
              border: 'none',
              outline: 'none'
            }} 
          />
          <button
            onClick={copyPasswordToClipboard}
            style={{
              backgroundColor: '#007bff',
              color: '#fff',
              border: 'none',
              padding: '10px 20px',
              cursor: 'pointer',
              borderRadius: '0 4px 4px 0',
              transition: 'background-color 0.3s'
            }}
            onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
            onMouseLeave={(e) => e.target.style.backgroundColor = '#007bff'}
          >
            Copy
          </button>
        </div>
        <div style={{ display: 'flex', fontSize: '0.875rem', columnGap: '8px' }}>
          <div style={{ display: 'flex', alignItems: 'center', columnGap: '4px' }}>
            <input 
              type="range"
              min={9}
              max={50}
              value={length}
              onChange={(e) => setLength(parseInt(e.target.value, 10))} // Added parseInt to ensure length is an integer
            />
            <label>Length: {length}</label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <input 
              type="checkbox"
              checked={numberAllowed} // Changed from defaultChecked to checked
              id="numberInput"
              onChange={() => setNumberAllowed(prev => !prev)}
            />
            <label htmlFor='numberInput'>Numbers</label>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            <input 
              type="checkbox"
              checked={charAllowed} // Changed from defaultChecked to checked
              id="characterInput"
              onChange={() => setCharAllowed(prev => !prev)}
            />
            <label htmlFor='characterInput'>Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
