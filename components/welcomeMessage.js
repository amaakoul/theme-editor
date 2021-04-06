import React, { useState } from 'react'
import TextField from '@material-ui/core/TextField'
import { useDispatch } from 'react-redux'

const WelcomeMessage = ({ value, styles, user = 'null' }) => {
  const dispatch = useDispatch()
  const [userInput, setEditingValue] = useState('')
  const [isEdit, setEditing] = useState(user === 'null')
  const validate = () => {
    window.localStorage.setItem('user', userInput)
    dispatch({ type: 'USER_DATA', payload: userInput })
    setEditing(false)
  }
  return (
    <div>
      {value ? (
        <span className={styles.title}>
          Welcome Back, {}
          <br /> your last configuration has benn saved
        </span>
      ) : (
        <span className={styles.title}>
          Welcome,{' '}
          {isEdit ? (
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
            <span onClick={() => setEditing(true)}>{user}</span>
          )}{' '}
          {!isEdit && <span style={{ fontSize: 'small' }}>(tap your user name to edit)</span>}
          <br /> There's no saved theme. please edit your config and save it.
        </span>
      )}
    </div>
  )
}
export default WelcomeMessage
