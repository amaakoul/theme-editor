import React, { useEffect } from 'react'
import Button from '@material-ui/core/Button'
import Snackbar from '@material-ui/core/Snackbar'
import IconButton from '@material-ui/core/IconButton'
import CloseIcon from '@material-ui/icons/Close'
import { Alert } from '@material-ui/lab'

export default function AlertMessage({
  open: openFromParent = false,
  callback = () => {},
  children,
  alertData = {}, // type of data should be success error etc
  ...props
}) {
  const [open, setOpen] = React.useState(openFromParent)

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
        <Alert onClose={handleClose} severity={alertData.type}>
          {alertData.message}
        </Alert>
      </Snackbar>
    </div>
  )
}
