import React, { useState } from 'react'

// Component accept text, placeholder values and also pass what type of Input - input, textarea
const Field = ({ text, type, placeholder, children, ...props }) => {
  // Manage the state whether to show the label or the input box. By default, label will be shown.
  const [isEditing, setEditing] = useState(false)

  // Event handler while pressing any key while editing
  const handleSubmit = (event, type) => {
    // Handle when key is pressed
    if (event.key === 'Enter' || event.type === 'click') console.log('keys :>> ', event, type)
  }

  /*
  - It will display a label is `isEditing` is false
  - It will display the children (input or textarea) if `isEditing` is true
  - when input `onBlur`, we will set the default non edit mode
  */

  return (
    <section {...props}>
      {isEditing ? (
        <div style={{}} onBlur={() => setEditing(false)} onKeyDown={e => handleSubmit(e, type)}>
          {children}
          <button onClick={handleSubmit}>submit</button>
        </div>
      ) : (
        <div onClick={() => setEditing(true)}>
          <span>{text || placeholder || 'Field content'}</span>
        </div>
      )}
    </section>
  )
}

export default Field
