import React from 'react'
import { List,ListItem } from 'semantic-ui-react'

export default function Footer() {
  return (
    <List>
    <ListItem icon='users' content='Semantic UI' />
    <ListItem icon='marker' content='New York, NY' />
    <ListItem
      icon='mail'
      content={<a href='mailto:jack@semantic-ui.com'>jack@semantic-ui.com</a>}
    />
    <ListItem
      icon='linkify'
      content={<a href='http://www.semantic-ui.com'>semantic-ui.com</a>}
    />
  </List>
  )
}
