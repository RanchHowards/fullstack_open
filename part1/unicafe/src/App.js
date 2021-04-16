import React, { useState } from 'react'
const Button = (props) => {
  return (
    <button onClick={props.handleClick}>{props.text}</button>
  )
}
const Statistic = (props) => {
  return (
    <tr><td>{props.text}</td><td>{props.calc}</td></tr>
  )
}

const Statistics = ({ good, bad, neutral, all }) => {

  if ((good + bad + neutral) === 0) {
    return (
      <p>No data available</p>
    )
  }
  else {
    return (
      <table>
        <tbody>
          <Statistic text="Good" calc={good} />
          <Statistic text="Neutral" calc={neutral} />
          <Statistic text="Bad" calc={bad} />
          <Statistic text="All" calc={all} />
          <Statistic text="Average" calc={(good - bad) / all} />
          <Statistic text="Positive" calc={`${(good * 100 / all)}%`} />
        </tbody>
      </table>

    )
  }
}
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGood = () => setGood(good + 1)
  const handleNeutral = () => setNeutral(neutral + 1)
  const handleBad = () => setBad(bad + 1)
  const all = good + bad + neutral

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={handleGood} text="Good" />
      <Button handleClick={handleNeutral} text="Neutral" />
      <Button handleClick={handleBad} text="Bad" />
      <h2>statistics</h2>
      <Statistics good={good} bad={bad} neutral={neutral} all={all} />
    </div>
  )
}

export default App