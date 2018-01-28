// Location information card for the sidebar
import React from 'react'
import {Card, CardActions, CardMedia, CardTitle, CardText} from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import { emit } from '../system/dispatcher'

export default class LocationInfo extends React.Component {
  render () {
    return (
      <Card>
        <CardMedia>
          <img src={this.props.image} alt={''} />
        </CardMedia>
        <CardTitle
          title={this.props.location}
          subtitle={this.props.country}
        />
        <CardText>
          Säätiedot tähän
        </CardText>
        <CardActions>
          <FlatButton
            icon={<i className={'material-icons'}>add_circle_outline</i>}
            label={'Lisää havainto'}
            onClick={() => { emit('REQUEST_DIALOG', [this.props.location]) }}
          />
        </CardActions>
      </Card>
    )
  }
}
