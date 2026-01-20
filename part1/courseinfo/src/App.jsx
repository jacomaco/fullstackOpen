import { useState } from "react";

const Header = (props) => {
    return (
        <div>
            <h1>{props.course}</h1>
        </div>
    );
};

const Content = (props) => {
    return (
        <div>
            <p>
                {props.part} {props.exercise}
            </p>
        </div>
    );
};

const Total = (props) => {
	const summary = Object.values(props).reduce(
		(acc, curr) => acc + curr, 0
	);
	
    return (
        <div>
            <p>Number of exercises {summary}</p>
        </div>
    );
};

const App = () => {
    const course = "Half stack application development";
    const part1 = "Fundamentals of React";
    const exercies1 = 10;
    const part2 = "Using propts to pass data";
    const exercies2 = 7;
    const part3 = "State of a component";
    const exercies3 = 14;

    return (
        <div>
            <Header course={course} />
            <Content part={part1} exercise={exercies1} />
            <Content part={part2} exercise={exercies2} />
            <Content part={part3} exercise={exercies3} />
			<Total exercies1={exercies1} exercies2={exercies2} exercies3={exercies3}/>
        </div>
    );
};

export default App;
