import React from 'react';


const Course = ({ course }) => {
    return (
        <>
            <Header name={course.name} />
            <Content course={course} />
            <Total parts={course.parts} />
        </>
    )
}

const Header = ({ name }) => {

    return (
        <h1>{name}</h1>
    )
}

const Total = ({ parts }) => {

    const sum = parts.reduce((acc, cur) => acc += cur.exercises, 0)
    return (
        <p><strong>Number of exercises {sum}</strong></p>
    )
}

const Part = ({ part }) => {
    return (
        <p>
            {part.name} {part.exercises}
        </p>
    )
}

const Content = ({ course }) => {
    const { parts } = course

    return (

        parts.map(part => <Part key={part.id} part={part} />)


        /* <Part part={course.parts[0]} />
          <Part part={course.parts[1]} />
          <Part part={course.parts[2]} /> */

    )
}
export default Course