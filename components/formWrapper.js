import { useRouter } from 'next/router'
import { useState, useContext } from 'react'
import { Paper } from '@material-ui/core'
import Button from '@material-ui/core/Button'
import { makeStyles } from '@material-ui/core/styles'
import SaveIcon from '@material-ui/icons/Save'
import FieldsGroup from '../components/fieldsGroup'
import AlertMessage from '../components/alertMessage'

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    background: 'black',
  },
}))

import { useSelector, useDispatch } from 'react-redux'

export default function FormWrapper({ styles, container, onSubmit } = {}) {
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

  // Build form model
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

  // const handleClose = (event, reason) => {
  //   if (reason === 'clickaway') return
  //   setOpen(false)
  // }

  return (
    <div>
      <Paper elevation={3} style={{ backgroundColor: 'rgb(176 22 22)', padding: '1em' }}>
        <h1>Theme Editor</h1>

        {/* Form */}
        <FieldsGroup
          onClick={e => updateData({ ...e })}
          categories={categories}
          className={styles.grid}
        ></FieldsGroup>

        <AlertMessage
          open={open}
          data={{ type: 'success', message: 'This is a success message!' }}
          callback={state => setOpen(state)}
        >
          {/* submit form */}
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
        </AlertMessage>
      </Paper>
      <div className={styles.grid}>
        <button className={styles.card} onClick={() => router.push('/')}>
          GO BACK HOME
        </button>
      </div>
    </div>
  )
}
