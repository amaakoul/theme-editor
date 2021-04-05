import React, { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import { List, ListItem, ListItemText, Divider } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Field from './field'

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

const validateField = (event, value, props, categorieId, id) => {
  const { validator, values } = value
  // build regex from attr schema
  const regex = new RegExp(validator.join('').replace(',', '|'))
  const isInputValid = regex.test(event.target.value)
  console.log('isInputValid :>> ', isInputValid, value)
  // trigger click if the value is valid
  if (isInputValid) {
    props.onClick({
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
    })
  }
}

const swapTemplateVariables = ({ values = {}, template = '' } = {}) =>
  template.replace(/(?:{(.+?)})/g, x => values[x.slice(1, -1)])

const ObjectToElement = ({ element = {} }) =>
  Object.keys(element).map(key => (
    <option key={key} value={key}>
      ${key}:{element[key]}
    </option>
  ))

export default function FieldsGroup(props) {
  const classes = useStyles()
  const [editValue, setEditValue] = useState('')

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
            <List component="nav" className={classes.root}>
              <Divider />
              {value.map(({ id, value = {} }) => (
                <ListItem button divider key={id} value={id}>
                  <div key={id} style={{ width: 'inherit' }} value={id}>
                    <ListItemText primary={id} secondary={''} />- {value.alias || id} :{' '}
                    {swapTemplateVariables(value)}
                    <Field
                      style={{ width: '100%', padding: '0em' }}
                      text={swapTemplateVariables(value)}
                      placeholder={swapTemplateVariables(value)}
                      data={value}
                      value={editValue}
                      type="input"
                    >
                      <span>{swapTemplateVariables(value)}</span>
                      <input
                        type="text"
                        name="task"
                        value={editValue}
                        placeholder={value.template || swapTemplateVariables(value)}
                        onKeyDown={event =>
                          event.key === 'Enter'
                            ? validateField(event, value, props, categorieId, id)
                            : {}
                        }
                        onChange={event => setEditValue(event.target.value)}
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
