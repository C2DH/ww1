import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { get } from 'lodash'
import {Helmet} from 'react-helmet';
import { Container, Row, Col } from 'reactstrap'
import ManualCard from '../../components/ManualCard'
import OtherTeachersCard from '../../components/OtherTeachersCard'
import BigTitle from '../../components/BigTitle'
import EducationFooter from '../../components/EducationFooter'
import StaticStory from '../../components/StaticStory'
import { getEducationals, getActivityDocuments } from '../../state/selectors'
import {
  loadEducationals,
  unloadEducationals,
  loadActivityDocuments,
  unloadActivityDocuments,
} from '../../state/actions'
import './Education.css'

class Education extends PureComponent {
  componentDidMount() {
    this.props.loadEducationals()
    this.props.loadActivityDocuments()
  }

  componentWillUnmount() {
    this.props.unloadEducationals()
    this.props.unloadActivityDocuments()
  }

  render() {
    const { educationals, documents } = this.props
    console.log(documents)
    return (
      <div className="Education__wrapper">
        <Helmet>
                <title>{this.context.t('education')}</title>
        </Helmet>
        <div className="Resources__top_wrapper animated fadeIn">
          <Container>
            <BigTitle title={this.context.t('education')} />
            <Row>
              <Col>
                  <h6 className="Education__h6">{this.context.t('introduction and pedagogical approach')}</h6>
                  <StaticStory slug='education' />
              </Col>
            </Row>
          </Container>
        </div>
        <Container className="animated fadeIn Education__container">
          <Row>
            <Col>
              <h6 className="Education__h6">{this.context.t('pedagogical activities')}</h6>
            </Col>
          </Row>
          {educationals && <Row className="Education__ManualsRow">
            {educationals.map(edu => (
              <Col lg="4" xs="12" key={edu.id}>
                <ManualCard
                  onClick={() => this.props.history.push(`/education/${edu.slug}`)}
                  title={edu.data.title}
                  image={get(edu, 'covers[0].data.resolutions.medium.url')}
                />
              </Col>
            ))}
          </Row>}
          {  (documents && documents.length > 0) &&
            <Row>
              <Col md="12">
                  <h6 className="Education__h6">{this.context.t('see how other teachers used our materials')}</h6>
                  <div className="Education__External__imgsContShadow">
                    <div className="Education__External__imgsCont">
                      { documents && documents.map(doc =>(
                        <div
                          key={doc.id}
                          className="Education__External__exercise">
                          <h6>{doc.translated.title}</h6>
                          <p>{doc.data.schoolname}</p>
                          <p>{this.context.t('year')}: {doc.data.year}</p>
                          <p>{this.context.t('coordinator(s)')}: {doc.data.coordinator}</p>
                          <p>
                            <a href={doc.url} target="_black">Link</a>
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
              </Col>
            </Row>
          }
        </Container>
        { educationals &&
          <EducationFooter />
        }
      </div>
    )
  }
}

Education.contextTypes = {
  t: React.PropTypes.func.isRequired
}

const mapStateToProps = state => ({
  educationals: getEducationals(state),
  documents: getActivityDocuments(state),
})

export default connect(mapStateToProps, {
  loadEducationals,
  unloadEducationals,
  loadActivityDocuments,
  unloadActivityDocuments,
})(Education)
