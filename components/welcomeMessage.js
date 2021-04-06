import React, { useEffect, useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { useDispatch } from 'react-redux'

const WelcomeMessage = ({ value, styles, user = 'null' }) => {
  const dispatch = useDispatch()
  const [userInput, setEditingValue] = useState('')
  const [isKnownUser, setUser] = useState(null)

  const validate = () => {
    window.localStorage.setItem('user', userInput)
    dispatch({ type: 'USER_DATA', payload: userInput })
    setUser(false)
  }

  useEffect(() => {
    setUser(user === 'null')
  }, [user])

  return (
    <div role="title">
      {value ? (
        <span className={styles.title}>
          Welcome Back,{' '}
          {isKnownUser ? (
            <TextField
              id="standard-basic"
              label="name"
              type="text"
              name="task"
              value={userInput}
              placeholder=""
              onKeyDown={event => (event.key === 'Enter' ? validate() : {})}
              onChange={event => setEditingValue(event.target.value)}
            />
          ) : (
            <span onClick={() => setUser(true)}>{user}</span>
          )}{' '}
          <br /> your last configuration has benn saved
        </span>
      ) : (
        <span className={styles.title}>
          Welcome,{' '}
          {isKnownUser ? (
            <TextField
              id="standard-basic"
              label="name"
              type="text"
              name="task"
              value={userInput}
              placeholder="your name"
              onKeyDown={event => (event.key === 'Enter' ? validate() : {})}
              onChange={event => setEditingValue(event.target.value)}
            />
          ) : (
            <span onClick={() => setUser(true)}>{user}</span>
          )}{' '}
          {!isKnownUser && <span style={{ fontSize: 'small' }}>(tap your user name to edit)</span>}
          <br /> There's no saved theme. please edit your config and save it.
        </span>
      )}
    </div>
  )
}
export default WelcomeMessage
