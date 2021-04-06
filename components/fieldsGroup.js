import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import { List, ListItem, ListItemText, Divider } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Field from './field'
import TextField from '@material-ui/core/TextField'

export const TIMER = 5000 // can be changed to 300ms
let VALIDATION_TIMEOUT

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
  },
}))

const validateField = (event, value, props, categorieId, id) => {
  clearTimeout(VALIDATION_TIMEOUT)
  const { validator, values } = value
  const regex = new RegExp(validator.join('').replace(',', '|'))
  // build regex from attr schema
  const isInputValid = regex.test(event.target.value)
  const payload = {
    [categorieId]: {
      [id]: {
        ...value,
        // slit user input to update in store
        values: Object.keys(values).reduce((acc, cur, i) => {
          acc[cur] = event.target.value.split(' ')[i]
          return acc
        }, values),
      },
    },
  }

  // trigger click if the value is valid
  if (event.key === 'Enter' && isInputValid) {
    props.onClick(payload)
  } else if (isInputValid) {
    VALIDATION_TIMEOUT = window.setTimeout(() => props.onClick(payload), TIMER)
  }
}

const swapTemplateVariables = ({ values = {}, template = '' } = {}) =>
  template.replace(/(?:{(.+?)})/g, x => values[x.slice(1, -1)])

export default function FieldsGroup(props) {
  const classes = useStyles()
  const [editValue, setEditValue] = useState('')

  return (
    <div className={classes.root}>
      {props.categories.map(({ id: categorieId, value }) => (
        <Accordion key={categorieId} value={categorieId} style={props.styles.group}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography className={classes.heading}>{categorieId}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List component="nav" className={classes.root}>
              <Divider />
              {value.map(({ id, value = {} }) => (
                <ListItem button divider key={id} value={id}>
                  <div key={id} style={{ width: 'inherit' }} value={id}>
                    <ListItemText primary={id} secondary={''} />
                    <Field
                      style={{ width: '100%', padding: '1.5em 1em' }}
                      text={`- ${value.alias || id} : ${swapTemplateVariables(value)}`}
                      placeholder={swapTemplateVariables(value)}
                      data={value}
                      value={editValue}
                      type="input"
                    >
                      <span>{`- ${value.alias || id} : ${editValue}`}</span>
                      <TextField
                        id="standard-basic"
                        label={value.template || swapTemplateVariables(value)}
                        type="text"
                        name="task"
                        value={editValue}
                        placeholder={value.template || swapTemplateVariables(value)}
                        onChange={event => {
                          setEditValue(event.target.value)
                          validateField(event, value, props, categorieId, id)
                        }}
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
