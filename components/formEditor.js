import { useRouter } from 'next/router'
import { useState, useContext } from 'react'
import AccordionGroups from '../components/accordion'
import { Paper } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import { Snackbar } from '@material-ui/core'
import { Alert } from '@material-ui/lab'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    background: 'black',
  },
}))

import { useSelector, useDispatch } from 'react-redux'

export default function FormEditor({ styles, container, onSubmit } = {}) {
  const classes = useStyles()
  const store = useSelector(state => state)
  const dispatch = useDispatch()
  const { tick, theme } = store
  console.log('data store :>> ', store)
  const router = useRouter()

  // const [state, setState] = useState({})
  // console.log('state payload :>> ', state)

  const updateData = ({ colors, textField, sizes, buttons }) => {
    const themeData = {
      colors: { ...theme.colors, ...colors },
      sizes: { ...theme.sizes, ...sizes },
      textField: { ...theme.textField, ...textField },
      buttons: { ...theme.buttons, ...buttons },
    }

    // setState({ ...themeData })
    dispatch({
      type: 'CREATE_NEW_THEME',
      payload: themeData,
    })
  }

  const categories = Object.entries(theme || {}).reduce((acc, el) => {
    const [id, value] = [...el]
    return (acc = [
      ...acc,
      {
        id,
        value: Object.entries(value || {}).reduce((acc, el) => {
          const [id, value] = [...el]
          return (acc = [...acc, { id, value }])
        }, []),
      },
    ])
  }, [])

  console.log('categories :>> ', categories)
  const [open, setOpen] = useState(false)

  const handleClick = () => {
    onSubmit()
    setOpen(true)
  }

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setOpen(false)
  }

  return (
    <div>
      <Paper elevation={3} style={{ backgroundColor: 'rgb(176 22 22)', padding: '1em' }}>
        <h1>Theme Editor</h1>
        <AccordionGroups
          onClick={e => updateData({ ...e })}
          categories={categories}
          className={styles.grid}
        ></AccordionGroups>
        <Button
          variant="contained"
          color="primary"
          size="large"
          className={classes.button}
          startIcon={<SaveIcon />}
          onClick={handleClick}
        >
          Save
        </Button>
      </Paper>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success">
          This is a success message!
        </Alert>
        {/* <Alert severity="error">This is an error message!</Alert> */}
      </Snackbar>
      <div className={styles.grid}>
        <h1
          className={styles.title}
          onClick={() => updateData({ textField: { color: { fontColor: 'blue' } } })}
        >
          llEDIT::{' '}
        </h1>
        <br />
        <h1
          className={styles.title}
          onClick={() =>
            updateData({
              colors: { primary: { fontColor: '#ccccccccc' } },
              textField: { color: { fontColor: 'zzzzzzzz' } },
            })
          }
        >
          ll EDIT::{' '}
        </h1>
        <button className={styles.card} onClick={() => router.push('/')}>
          GO BACK HOME
        </button>
      </div>
    </div>
  )
}
