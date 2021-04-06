import { makeStyles } from '@material-ui/core/styles'
import Accordion from '@material-ui/core/Accordion'
import AccordionSummary from '@material-ui/core/AccordionSummary'
import AccordionDetails from '@material-ui/core/AccordionDetails'
import { List, Divider } from '@material-ui/core'
import Typography from '@material-ui/core/Typography'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import FieldWrapper from '../components/fieldWrapper'

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    fontWeight: theme.typography.fontWeightRegular,
  },
}))

export default function FieldsGroup(props) {
  const classes = useStyles()

  return (
    <div className={classes.root}>
      {props.categories.map(({ id: categorieId, value }) => (
        <Accordion
          role="formGroup"
          key={categorieId}
          value={categorieId}
          style={props.styles.group}
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
              <FieldWrapper value={value} categorieId={categorieId} {...props}></FieldWrapper>
              <Divider light />
            </List>
          </AccordionDetails>
        </Accordion>
      ))}
    </div>
  )
}
