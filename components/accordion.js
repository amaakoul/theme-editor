import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import { List, ListItem, ListItemText, Divider } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Field from '../components/field'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
  },
}))

const objectToString = (obj = {}) => Object.entries(obj).join('').replace(',', ' : ')
const ObjectToElement = ({ element = {} }) =>
  Object.keys(element).map(key => (
    <option key={key} value={key}>
      ${key}:{element[key]}
    </option>
  ))
export default function AccordionGroups(props) {
  const classes = useStyles()
  console.log('props :>> ', props, props.categories)
  return (
    <div className={classes.root}>
      {props.categories.map(({ id: categorieId, value }) => (
        <Accordion
          key={categorieId}
          value={categorieId}
          style={{
            backgroundColor: '#951717',
          }}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>{categorieId}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List component="nav" className={classes.root} aria-label="mailbox folders">
              <Divider />
              {value.map(({ id, value = {} }) => (
                <ListItem button divider key={id} value={id}>
                  <div key={id} value={id}>
                    <ListItemText primary={id} secondary={Object.keys(value).map(key => key)} />
                    <Field
                      style={{ width: '100%', padding: '0em' }}
                      text={objectToString(value)}
                      placeholder={objectToString(value)}
                      type="input"
                    >
                      <ObjectToElement element={value}></ObjectToElement>
                      <input
                        type="text"
                        name="task"
                        placeholder={objectToString(value)}
                        onKeyDown={e =>
                          e.key === 'Enter'
                            ? props.onClick({
                                [categorieId]: {
                                  [id]: { [Object.keys(value).map(key => key)]: e.target.value },
                                },
                              })
                            : {}
                        }
                        // onChange={e =>
                        //   e.key === 'Enter' ? onClick({ [id]: { key: e.target.value } }) : {}
                        // }
                      />
                    </Field>
                  </div>
                </ListItem>
              ))}
              <Divider light />
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}
