import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

const App = () => {
    const [value, setValue] = useState(10);

    const setToValue = (newValue) => () => {
        console.log("value now", newValue); // print the new value to console
        setValue(newValue);
    };

	const setOtherValue = (newValue) => {
		console.log("value now", newValue);
	}	

    return (
        <div>
            {value}
			<button onClick={setOtherValue(10)}>value</button>
            <button onClick={setToValue(1000)}>thousand</button>
            <button onClick={setToValue(0)}>reset</button>
            <button onClick={setToValue(value + 1)}>increment</button>
        </div>
    );
};

export default App;
