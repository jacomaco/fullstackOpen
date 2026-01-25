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

const Part = ({ part, exercises }) => {
    return (
        <div>
            <p>
                {part} {exercises}
            </p>
        </div>
    );
};

const Total = ({ course }) => {
    return (
        <p>
            Number of exercises{" "}
            {course.parts[0].exercises +
                course.parts[1].exercises +
                course.parts[2].exercises}
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
