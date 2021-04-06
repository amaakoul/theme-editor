import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { window } from 'browser-monads'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { wrapper } from '../redux/store'
import { makeStyles } from '@material-ui/core/styles'
import EditIcon from '@material-ui/icons/Edit'
import CloseIcon from '@material-ui/icons/Close'
import DeleteIcon from '@material-ui/icons/Delete'
import BrightnessHigh from '@material-ui/icons/BrightnessHigh'
import Brightness5 from '@material-ui/icons/Brightness5'
import Button from '@material-ui/core/Button'
import WelcomeMessage from '../components/welcomeMessage'
import FormWrapper from '../components/formWrapper'
import AlertMessage from '../components/alertMessage'

const getLocalStorage = async () => {
  const user = JSON.stringify(window.localStorage.getItem('user'))
  const rawSavedTheme = JSON.stringify(window.localStorage.getItem('theme'))
  const savedData = rawSavedTheme && JSON.parse(JSON.parse(rawSavedTheme))
  return { ...(savedData && { theme: savedData, origin: 'localStorage' }), user }
}

export const getStaticProps = wrapper.getStaticProps(({ store, preview = '' }) => {
  // access what was set in the previous page
  store.dispatch({ type: 'TICK', payload: 'was set in other pagee' + preview })
})

const createConf = (c1, c2, c3) => ({
  wrapper: {
    className: styles.container,
    style: {
      backgroundColor: c1 || 'white',
    },
  },
  paper: { backgroundColor: c2 || 'rgb(0 0 0 / 13%)', padding: '1em' },
  group: { backgroundColor: c3 || 'white', padding: '1em' },
})

const useStyles = makeStyles(theme => ({
  button: {
    margin: theme.spacing(1),
    background: 'black',
  },
}))

export default function Home({ Component, pageProps } = {}) {
  const classes = useStyles()
  const dispatch = useDispatch()
  const router = useRouter()
  const [isEditing, setEditing] = useState(false)
  const [open, setOpen] = useState(false)
  const store = useSelector(state => state)

  const isSavedTheme = store.origin === 'localStorage'

  const [globalStyle, setGlobalStyle] = useState(createConf())

  useEffect(() => {
    getLocalStorage().then(({ theme, origin = 'origin', user }) => {
      dispatch({ type: 'USER_DATA', payload: user })
      if (theme) {
        dispatch({ type: 'CREATE_NEW_THEME', payload: theme })
        dispatch({ type: 'DATA_ORIGIN', payload: origin })
      } else {
        fetchFromApi()
      }
    })
  }, [])

  const fetchFromApi = async () => {
    return fetch('/api/theme-schema', {
      method: 'GET',
      headers: new Headers(),
      mode: 'cors',
      cache: 'default',
    })
      .then(Response => Response.json())
      .then(theme => {
        dispatch({ type: 'CREATE_NEW_THEME', payload: theme })
        dispatch({ type: 'DATA_ORIGIN', payload: origin })
      })
  }
  const saveInStorage = success => {
    window.localStorage.setItem('theme', JSON.stringify(store.theme))
    // setEditing(success) // to close the form on success
  }
  const handleClick = ({ event, page = 'home' }) => {
    event.preventDefault()
    router.push(`/${page}`)
  }
  const deleteStorage = () => {
    window.localStorage.clear()
    setOpen(true)
    fetchFromApi()
  }

  return (
    <div className={styles.container} {...globalStyle.wrapper}>
      <Head>
        <title>Create Theme Editor App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div style={{ position: 'absolute', top: 0 }}>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={event =>
              setGlobalStyle(createConf('rgb(209 27 27)', 'rgb(0 0 0 / 13%)', 'rgb(169 28 28)'))
            }
          >
            APP IN RED mode
            <Brightness5 />
          </Button>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={event =>
              setGlobalStyle(createConf('rgb(224 224 224)', 'rgb(224 224 224)', 'rgb(224 224 224)'))
            }
          >
            APP IN GRAY mode
            <BrightnessHigh />
          </Button>
        </div>
        <div style={{ flexWrap: 'wrap', display: 'flex' }}>
          {process.browser && !isEditing && (
            <WelcomeMessage value={isSavedTheme} user={store.user} styles={styles}></WelcomeMessage>
          )}

          {isEditing ? (
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={event => setEditing(false)}
            >
              <CloseIcon />
              CLOSE EDITOR
            </Button>
          ) : (
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={event => setEditing(true)}
            >
              <EditIcon />
              EDIT THEME CONFIGURATION
            </Button>
          )}

          {process.browser && (
            <AlertMessage
              open={open}
              data={{
                type: 'success',
                message: 'The theme configuration has been deleted!',
              }}
              callback={state => setOpen(state)}
            >
              <Button
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<DeleteIcon />}
                onClick={deleteStorage}
              >
                DELETE THE SAVED THEME
              </Button>
            </AlertMessage>
          )}

          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={event => handleClick({ event })}
          >
            HOME PAGE
          </Button>
        </div>
        <div style={{ width: '100%' }}>
          {isEditing && (
            <FormWrapper
              onSubmit={ev => saveInStorage(ev)}
              styles={({ ...styles }, globalStyle)}
            ></FormWrapper>
          )}
        </div>
      </main>
      <footer className={styles.footer}>
        <a href="#" target="_blank">
          By Ahmed MAKOUL <img src="/logo-am.jpg" alt="AM Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
