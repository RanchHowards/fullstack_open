import React from 'react';
import ReactDOM from 'react-dom';
import Course from './Components/Header'

// const Course = ({ course }) => {
//   return (
//     <>
//       <Header name={course.name} />
//       <Content course={course} />
//       <Total parts={course.parts} />
//     </>
//   )
// }

// const Header = ({ name }) => {

//   return (
//     <h1>{name}</h1>
//   )
// }

// const Total = ({ parts }) => {

//   const sum = parts.reduce((acc, cur) => acc += cur.exercises, 0)
//   return (
//     <p><strong>Number of exercises {sum}</strong></p>
//   )
// }

// const Part = ({ part }) => {
//   return (
//     <p>
//       {part.name} {part.exercises}
//     </p>
//   )
// }

// const Content = ({ course }) => {
//   const { parts } = course

//   return (

//     parts.map(part => <Part key={part.id} part={part} />)


//     /* <Part part={course.parts[0]} />
//       <Part part={course.parts[1]} />
//       <Part part={course.parts[2]} /> */

//   )
// }

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    },
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return (courses.map(course => <Course key={course.id} course={course} />))

}

ReactDOM.render(<App />, document.getElementById('root'))