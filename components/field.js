import React, { useState } from 'react'
import AlertMessage from '../components/alertMessage'

// Component accept text, placeholder values and also pass what type of Input - input, textarea
const Field = ({ text, type, placeholder, children, data, value, ...props }) => {
  // Manage the state whether to show the label or the input box. By default, label will be shown.
  const [isEditing, setEditing] = useState(false)
  const [open, setOpen] = useState(false)
  const [alertData, setAlertData] = useState({ value: '', type: '' })

  // Event handler while pressing any key while editing
  const handleSubmit = (event, type) => {
    if (event.key === 'Enter' || event.type === 'click') {
      // Handle when key is pressed
      const { validator, values } = data
      // build regex from attr schema
      const regex = new RegExp(validator.join('').replace(',', '|'))
      const isInputValid = regex.test(value || event.target.value)
      setEditing(!isInputValid)
      setOpen(true)
      setAlertData({
        type: isInputValid ? 'success' : 'error',
        message: isInputValid ? 'saved!' : 'wrong format, please add space between values',
      })
    }
  }

  /*
  - It will display a label is `isEditing` is false
  - It will display the children (input or textarea) if `isEditing` is true
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
          onKeyDown={e => handleSubmit(e, type)}
        >
          {children}
          <button onClick={handleSubmit}>submit</button>
        </div>
      ) : (
        <div onClick={() => setEditing(true)}>
          <span>{text || placeholder || 'Field content'}</span>
        </div>
      )}
      <AlertMessage open={open} data={alertData} callback={state => setOpen(state)}>
        {' '}
      </AlertMessage>
    </section>
  )
}

export default Field
