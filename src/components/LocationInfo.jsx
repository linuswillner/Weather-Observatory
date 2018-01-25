import React from 'react'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import FlatButton from 'material-ui/FlatButton'

export default class LocationInfo extends React.Component {
  render () {
    return (
      <Card>
        <CardMedia>
          <img src={this.props.image} alt="" />
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
            icon={
              <i className={'material-icons'}>add_circle_outline</i>
            }
            label="Lisää havainto"
          />
        </CardActions>
      </Card>
    )
  }
}
