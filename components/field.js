import React, { useState } from 'react'
import AlertMessage from '../components/alertMessage'
import Button from '@material-ui/core/Button'
import { TIMER } from '../components/fieldWrapper'

let validationTimeout

const button = {
  wrapper: { display: 'flex', padding: ' 1em 0px' },
  submit: { width: '100%', background: 'black' },
  cancel: {
    width: '100%',
    color: 'black',
  },
}

// Component accept text, placeholder values and also pass what type of Input
const Field = ({ text, type, placeholder, children, data, value, ...props }) => {
  // Manage the state whether to show the label or the input box. By default, label will be shown.
  const [isEditing, setEditing] = useState(false)
  const [open, setOpen] = useState(false)
  const [hover, setHover] = useState(false)
  const [alertData, setAlertData] = useState({ value: '', type: '' })

  // Event handler while pressing any key while editing
  const handleSubmit = (event, type) => {
    clearTimeout(validationTimeout)
    // Handle when key is pressed
    const { validator, values } = data
    // build regex from attr schema
    const regex = new RegExp(validator.join('').replaceAll(',', '|'))
    const isInputValid = regex.test(event.target.value || value)

    if (event.key === 'Enter' || event.type === 'click') {
      setEditing(!isInputValid)
      setOpen(true)
      setAlertData({
        type: isInputValid ? 'success' : 'error',
        message: isInputValid ? 'saved!' : 'wrong format, please seperate values with a space',
      })
    } else {
      validationTimeout = window.setTimeout(() => {
        setEditing(!isInputValid)
        setOpen(true)
        setAlertData({
          type: isInputValid ? 'success' : 'error',
          message: isInputValid ? 'saved!' : 'wrong format, please seperate values with a space',
        })
      }, TIMER)
    }
  }

  /*
  - It will display a label is `isEditing` is false
  - It will display the children (input field) if `isEditing` is true
  - when input `onBlur`, we will set the default non edit mode
  */

  return (
    <section {...props}>
      {isEditing ? (
        <div
          style={{
            display: 'flex',
            flexFlow: 'column',
          }}
          onBlur={() => {}}
          onChange={e => handleSubmit(e, type)}
          onKeyPress={e => handleSubmit(e, type)}
        >
          {children}
          <div style={button.wrapper}>
            <Button
              style={button.submit}
              onClick={handleSubmit}
              variant="contained"
              color="primary"
            >
              submit
            </Button>
            <Button style={button.cancel} onClick={() => setEditing(false)} variant="contained">
              close
            </Button>
          </div>
        </div>
      ) : (
        <div
          style={{ height: '2em', color: hover ? '#0f239e' : 'black' }}
          onClick={() => setEditing(true)}
          onMouseEnter={() => setHover(true)}
          onMouseLeave={() => setHover(false)}
        >
          <span role="placeholder">{text || placeholder || 'Field content'}</span>
        </div>
      )}
      <AlertMessage open={open} data={alertData} callback={state => setOpen(state)}>
        {' '}
      </AlertMessage>
    </section>
  )
}

export default Field
