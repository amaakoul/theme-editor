import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { window } from 'browser-monads'
import { useDispatch } from 'react-redux'
import FormEditor from '../components/formEditor'
import WelcomeMessage from '../components/welcomeMessage'
import { useSelector } from 'react-redux'
import { wrapper } from '../redux/store'
import EditIcon from '@material-ui/icons/Edit'
import CloseIcon from '@material-ui/icons/Close'
import { makeStyles } from '@material-ui/core/styles'
import DeleteIcon from '@material-ui/icons/Delete'
import Button from '@material-ui/core/Button'

const getLocalStorage = async () => {
  const rawSavedTheme = JSON.stringify(window.localStorage.getItem('theme'))
  const savedData = rawSavedTheme && JSON.parse(JSON.parse(rawSavedTheme))
  return { ...(savedData && { theme: savedData, origin: 'localStorage' }) }
}

export const getStaticProps = wrapper.getStaticProps(({ store, preview = '' }) => {
  // access what was set in the previous page
  store.dispatch({ type: 'TICK', payload: 'was set in other pagee' + preview })
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
  const store = useSelector(state => state)

  const isSavedTheme = store.origin === 'localStorage'
  useEffect(() => {
    getLocalStorage().then(({ theme, origin = 'origin' }) => {
      console.log('theme,origin :>> ', theme, origin)
      if (theme) {
        dispatch({ type: 'CREATE_NEW_THEME', payload: theme })
        dispatch({ type: 'DATA_ORIGIN', payload: origin })
      } else {
        fetchFromApi()
      }
    })
  }, [])

  const fetchFromApi = async () => {
    return fetch('/api/themeSchema', {
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
  const saveInStorage = () => {
    console.log('store.theme :>> ', store.theme)
    window.localStorage.setItem('theme', JSON.stringify(store.theme))
  }
  const handleClick = ({ event, page = 'home' }) => {
    event.preventDefault()
    router.push(`/${page}`)
  }
  const deleteStorage = () => {
    window.localStorage.clear()
    fetchFromApi()
  }
  const globalStyle = {
    className: styles.container,
    style: {
      backgroundColor: 'rgb(209 27 27)',
    },
  }

  return (
    <div className={styles.container} {...globalStyle}>
      <Head>
        <title>Create Theme Editor App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div>
          {process.browser && !isEditing && (
            <WelcomeMessage value={isSavedTheme} styles={styles}></WelcomeMessage>
          )}

          {process.browser && (
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<DeleteIcon />}
              onClick={deleteStorage}
            >
              DELETE THE SAVED THEME
            </Button>
          )}

          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            onClick={event => handleClick({ event })}
          >
            GO HOME
          </Button>

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
              EDIT THEME
            </Button>
          )}
        </div>
        <div>
          {isEditing && <FormEditor onSubmit={() => saveInStorage()} styles={styles}></FormEditor>}
        </div>
      </main>
      <footer className={styles.footer}>
        <a href="#" target="_blank" rel="noopener noreferrer">
          By Ahmed MAKOUL <img src="/logo-am.jpg" alt="AM Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
