import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

const App = () => {
	const [ counter, setCounter ] = useState(0)

	setTimeout(
		() => setCounter(counter + 1),
		1000
	)

	return (
		<div>{counter}</div>
	)
}


export default App;
