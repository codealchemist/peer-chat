import React from 'react'
import moment from 'moment'
import { Wrapper, Content, Text, Date, ActionButtonWrapper } from './Elements'

const Notification = ({ text, date, actionButton = '' }) => (
  <Wrapper>
    <Content>
      <Text>
        <Date>
          <p>{moment(date).format('MMMM Do YYYY, h:mm:ss a')}</p>
        </Date>
        <p>{text}</p>
        <ActionButtonWrapper>{actionButton}</ActionButtonWrapper>
      </Text>
    </Content>
  </Wrapper>
)

export default Notification
