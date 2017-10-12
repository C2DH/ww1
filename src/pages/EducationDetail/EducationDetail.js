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
import './EducationDetail.css'

class EducationalDetail extends PureComponent {

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
      <div>
        {educational && (
          <div>
          <div className='EducationDetail'>
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
                    <h4 className='EducationDetail__h6'>Requirements	for	the	pupils</h4>
        </Container>
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
})(EducationalDetail)
