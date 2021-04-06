import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import { Alert } from '@material-ui/lab'

export default function AlertMessage({
  open: openFromParent = false,
  callback = () => {},
  children,
  data = {}, // types of alerts, success, error, warning and info
  ...props
}) {
  const [open, setOpen] = useState(openFromParent)

  useEffect(() => {
    setOpen(openFromParent)
  }, [openFromParent])

  const handleClick = () => {
    callback(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') return
    callback(false)
  }

  return (
    <div {...props}>
      {children ? children : <Button onClick={handleClick}>Open simple snackbar</Button>}
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={data.type}>
          {data.message}
        </Alert>
      </Snackbar>
    </div>
  )
}
