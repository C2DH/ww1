import React from 'react'
import {  Container, Row, Col } from 'reactstrap'
import StaticStory from '../../components/StaticStory'
import BigTitle from '../../components/BigTitle'
import './About.css'

const About = () => (
  <Container>
    <BigTitle title="About" />
    <StaticStory slug='about' />
  </Container>

)

export default About
