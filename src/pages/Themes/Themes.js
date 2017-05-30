import React from 'react'
import { Container, Row } from 'reactstrap';
import ThemesCard from '../../components/ThemesCard'
import './Themes.css'

const Themes = () => (
  <Container>
    <Row className="Themes__TitleRow">
      <h1>Themes</h1>
    </Row>
    <Row>
      <ThemesCard title="the occupation" />
      <ThemesCard title="grief and loss" />
      <ThemesCard title="the food crisis" />
      <ThemesCard title="migrations" />
    </Row>
  </Container>
)

export default Themes
