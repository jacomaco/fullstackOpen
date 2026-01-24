import { useState } from "react";

// components
const Button = (props) => <button onClick={props.onClick}>{props.text}</button>;

const Statistics = ({good, neutral, bad}) => {
	const total = good + neutral + bad;
	const average = total === 0 ? 0 : (good - bad) / total;
	const positivePercentage = total === 0 ? 0 : (good / total) * 100;

	if (total === 0) {
		return (
			<div>
				<h1>statistics</h1>
				<h3>No feedback given</h3>
			</div>
		)
	}

	return  (
		<div>
			<h1>statistics</h1>
			<table>
				<tbody>
					<StatisticLine text="good" value={good}/>
					<StatisticLine text="neutral" value={neutral} />
					<StatisticLine text="bad" value={bad} />
					<StatisticLine text="all" value={total} />
					<StatisticLine text="average" value={average} />
					<StatisticLine text="positive" value={positivePercentage + " %"} />
				</tbody>
			</table>
		</div>
	)
}

const StatisticLine = ({ text, value }) => {
	console.log(text);
	console.log(value);
	return (
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
	)
	
}

const App = () => {
    // save clicks of each button to its own state
    const [good, setGood] = useState(0);
    const [neutral, setNeutral] = useState(0);
    const [bad, setBad] = useState(0);

    return (
        <div>
            <h1>give feedback</h1>
            <Button onClick={() => setGood(good + 1)} text="good" />
			<Button onClick={() => setNeutral(neutral + 1)} text="neutral" />
			<Button onClick={() => setBad(bad + 1)} text="bad" />
			<Statistics good={good} neutral={neutral} bad={bad} />
        </div>
    );
};

export default App;
