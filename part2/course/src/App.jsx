const Course = ({ course }) => {
    return (
        <>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </>
    );
};

const Header = ({ course }) => {
    return <h1>{course.name}</h1>;
};

const Content = ({ course }) => {
    return (
        <div>
            {course.parts.map((part) => (
                <Part
                    key={part.id}
                    part={part.name}
                    exercises={part.exercises}
                />
            ))}
        </div>
    );
};

const Part = ({ part, exercises }) => <p>{part} {exercises}</p>

const Total = ({ course }) => {
    const totalExercises = course.parts.reduce((sum, part) => sum + part.exercises, 0);

    return (
        <p>
            Number of exercises{" "}
            {totalExercises}
        </p>
    );
};

const App = () => {
    const course = {
        name: "Half Stack application development",
        id: 1,
        parts: [
            {
                name: "Fundamentals of React",
                exercises: 10,
                id: 1,
            },
            {
                name: "Using props to pass data",
                exercises: 7,
                id: 2,
            },
            {
                name: "State of a component",
                exercises: 14,
                id: 3,
            },
        ],
    };

    return <Course course={course} />;
};

export default App;
