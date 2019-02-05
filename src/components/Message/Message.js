import React from 'react'
import moment from 'moment'
import Typography from '@material-ui/core/Typography'
import Avatar from 'components/Avatar'
import { Wrapper, Content, Text, Date } from './Elements'

/**
 * Returns a message component.
 * Params:
 * {
 *  user: {name, avatar},
 *  text: 'The message',
 *  date: Date Object,
 *  type: [notification|own|peer]
 * }
 *
 * @param {obj}
 */
const Message = ({ user, text, date, type = 'own' }) => (
  <Wrapper type={type}>
    <Avatar avatar={user.avatar} />
    <Content type={type}>
      <Text type={type}>
        <Date>
          <p>{moment(date).format('MMMM Do YYYY, h:mm a')}</p>
        </Date>
        <Typography>
          <b>{user.name}</b>
        </Typography>
        <span>{text}</span>
      </Text>
    </Content>
  </Wrapper>
)

export default Message
