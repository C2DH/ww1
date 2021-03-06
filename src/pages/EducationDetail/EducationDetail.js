import React, { PureComponent } from 'react'
import { get } from 'lodash'
import { connect } from 'react-redux'
import { Container, Row, Col } from 'reactstrap'
import {
  loadEducational,
  unloadEducational,
} from '../../state/actions'
import { getEducational, getEducationalError } from '../../state/selectors'
import BigTitle from '../../components/BigTitle'
import EducationExpandableItem from '../../components/EducationExpandableItem'
import NotFound from '../../components/NotFound'
import EducationFooter from '../../components/EducationFooter'
import CollectionItemLink from '../../components/CollectionItemLink'
import {Helmet} from 'react-helmet';
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
    const { educational, error } = this.props

    if (get(error, 'response.status') === 404) {
      return <NotFound />
    }

    return (
      <div className='EducationDetail'>
        {
          educational &&
          <Helmet>
                <title>{educational.data.title}</title>
          </Helmet>

        }
        {educational && (
          <div className="animated fadeIn">
            <div className='EducationDetail__top'>
              <Container>
                <BigTitle title={educational.data.title} />
                <Row className="EducationDetail__cont">
                  <Col xs={12} lg={6} className="EducationDetail__order-1 EducationDetail__order-md-0">
                    <h6 className='EducationDetail__h6'>{this.context.t('introduction')}</h6>
                    <p>{educational.data.activity}</p>
                    <Row>
                      <Col xs={12} lg={6}>
                        <h6 className='EducationDetail__h6'>{this.context.t('skills')}</h6>
                        <ul className='pl-4'>
                          {educational.data.requirements.map((req, index) => (
                            <li key={index}>{req}</li>
                          ))}
                        </ul>
                      </Col>
                      <Col xs={12} lg={6}>
                        <h6 className='EducationDetail__h6'>{this.context.t('pedagogical manual')}</h6>
                        <a
                          className="btn btn-secondary EducationDetail__DownloadBtn"
                          href={get(educational, 'contents.manual.attachment')}>
                          <i className="material-icons">get_app</i>
                          {this.context.t('download')}
                        </a>
                      </Col>
                    </Row>
                  </Col>
                  <Col xs={12} lg={6} className="EducationDetail__order-0 EducationDetail__order-md-1">
                    <img className='img-fluid mb-3' src={get(educational, 'covers[0].attachment')} />
                  </Col>
                </Row>
              </Container>
            </div>
            <Container>
              <h6 className='EducationDetail__h6'>{this.context.t('suggested activities')}</h6>
              <Row className='mt-4'>
                <Col xs={12} lg={8} className="EducationDetail__order-1 EducationDetail__order-md-0">
                  {educational.data.steps.map((step, i) => (
                    <EducationExpandableItem
                      key={i}
                      counter={i+1}
                      label={this.context.t(step.label)}
                      title={step.title}
                      description={step.description}
                    />
                  ))}
                </Col>
                <Col xs={12} lg={4} className="EducationDetail__order-0 EducationDetail__order-md-1">
                  <div className="mb-3">
                    <div>
                      <img className='img-fluid' src={get(educational, 'contents.object.attachment')} />
                      <div className='EducationDetail__DocLink'>
                        <CollectionItemLink doc={get(educational, 'contents.object')} /></div>
                    </div>
                    <div className='EducationDetail__imageCaption'>
                      <div><i className='icon-hand' /></div>
                      <div>{get(educational, 'contents.object.translated.title')}</div>
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
  error: getEducationalError(state),
})

EducationDetail.contextTypes = {
  t: React.PropTypes.func.isRequired
}

export default connect(mapStateToProps, {
  loadEducational,
  unloadEducational,
})(EducationDetail)
