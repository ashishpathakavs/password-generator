import { useState } from "react";
import Button from "./components/Button";
import Checkbox from "./components/Checkbox";
import PasswordStrengthIndicator from "./components/StrengthChecker";
import usePasswordGenerator from "./hooks/usePasswordGenerator";
import "./styles.css";

export default function App() {
  const [length, setLength] = useState(4);
  const [checkboxData, setCheckboxData] = useState([
    { title: "Include Uppercase Letters", state: false },
    { title: "Include Lowercase Letters", state: false },
    { title: "Include Numbers", state: false },
    { title: "Include Symbols", state: false }
  ]);
  const [copied, setCopied] = useState(false);

  const { password, errorMessage, generatePassword } = usePasswordGenerator();

  const handleCheckboxChange = (i) => {
    const updatedCheckboxData = [...checkboxData];
    updatedCheckboxData[i].state = !updatedCheckboxData[i].state;
    setCheckboxData(updatedCheckboxData);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(password);
    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1000);
  };

  return (
    <div className="container">
      {/* Password text and copy */}
      {password && (
        <div className="header">
          <div className="title">{password}</div>
          <Button
            customClass="copyBtn"
            onClick={handleCopy}
            text={copied ? "copied" : "copy"}
          />
        </div>
      )}

      {/* Charachter Length */}
      <div className="charlength">
        <span>
          <label>Character Length</label>
          <label>{length}</label>
        </span>

        <input
          type="range"
          min="4"
          max="20"
          value={length}
          onChange={(e) => setLength(e.target.value)}
        />
      </div>

      {/* checkboxes */}
      <div className="checkboxes">
        {checkboxData.map((checkbox, index) => {
          return (
            <Checkbox
              key={index}
              title={checkbox.title}
              state={checkbox.state}
              onChange={() => handleCheckboxChange(index)}
            />
          );
        })}
      </div>
      {/* Strength */}
      <PasswordStrengthIndicator password={password} />
      {/* Error Handling */}
      {errorMessage && <div className="errorMessage">{errorMessage}</div>}

      {/* Generate button */}

      <Button
        customClass="genrateBtn"
        onClick={() => {
          generatePassword(checkboxData, length);
        }}
        text="generate Password"
      />
    </div>
  );
}
