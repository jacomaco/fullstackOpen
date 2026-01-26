const Course = ({ course }) => {
    console.log(course.id);
    return (
        <>
            <Header course={course} />
            <Content course={course} />
            <Total course={course} />
        </>
    );
};

const Header = ({ course }) => <h1>{course.name}</h1>;

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
    return <b>Total of {" "} {totalExercises} {" "} exercises</b>
};

const Courses = ({ courses }) => {
    return <div>{courses.map(course => <Course key={course.id} course={course} />)}</div>
}

export default Courses;