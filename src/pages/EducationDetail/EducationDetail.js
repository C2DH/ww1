import React, { PureComponent } from 'react'
import { get } from 'lodash'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'
import {
  loadEducational,
  unloadEducational,
} from '../../state/actions'
import { getEducational } from '../../state/selectors'
import BigTitle from '../../components/BigTitle'
import EducationExpandableItem from '../../components/EducationExpandableItem'
import EducationFooter from '../../components/EducationFooter'
import CollectionItemLink from '../../components/CollectionItemLink'
import './EducationDetail.css'

class EducationDetail extends PureComponent {

  componentDidMount() {
    this.props.loadEducational(this.props.match.params.slug)
  }

  componentWillReciveProps(nextProps) {
    if (this.props.match.params.slug !== nextProps.match.params.slug) {
      this.props.unloadEducational()
      this.props.loadEducational(nextProps.match.params.slug)
    }
  }

  componentWillUnmount() {
    this.props.unloadEducational()
  }

  render() {
    const { educational } = this.props
    console.log(educational)

    return (
      <div className='EducationDetail'>
        {educational && (
          <div>
            <div className='EducationDetail__top'>
              <Container>
                <BigTitle title={educational.data.title} />
                <Row>
                  <Col md={6}>
                    <h4 className='EducationDetail__h6'>goals of the activity</h4>
                    <p>{educational.data.activity}</p>
                    <Row>
                      <Col md={6}>
                        <h4 className='EducationDetail__h6'>Requirements	for	the	pupils</h4>
                        <ul>
                          {educational.data.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </Col>
                      <Col md={6}>
                        <h4 className='EducationDetail__h6'>Pedagogical manual</h4>
                        <a
                          className="btn btn-secondary EducationDetail__DownloadBtn"
                          href={get(educational, 'contents.object.attachment')}>
                          <i className="material-icons">get_app</i>
                          Download
                        </a>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={6}>
                    <img className='img-fluid' src={get(educational, 'covers[0].attachment')} />
                  </Col>
                </Row>
              </Container>
            </div>
            <Container>
              <h4 className='EducationDetail__h6'>Step by step manual</h4>
              <Row>
                <Col md={8}>
                  {educational.data.steps.map((step, i) => (
                    <EducationExpandableItem
                      key={i}
                      label={step.label}
                      title={step.title}
                      description={step.description}
                    />
                  ))}
                </Col>
                <Col md={4}>
                  <div>
                    <div>
                      <img className='img-fluid' src={get(educational, 'contents.object.attachment')} />
                      <div className='EducationDetail__DocLink'>
                        <CollectionItemLink doc={get(educational, 'contents.object')} /></div>
                    </div>
                    <div className='EducationDetail__imageCaption'>
                      <div><i className='icon-hand' /></div>
                      <div>{get(educational, 'contents.object.translated.description')}</div>
                    </div>
                  </div>
                </Col>
              </Row>
            </Container>
            <EducationFooter />
          </div>
        )}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  educational: getEducational(state),
})

export default connect(mapStateToProps, {
  loadEducational,
  unloadEducational,
})(EducationDetail)
