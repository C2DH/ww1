import React from 'react'
import { defaultMemoize } from 'reselect'
import { pure } from 'recompose'
import { get } from 'lodash'
import ModuleCarousel from './ModuleCarousel'
import CollectionMasonry from '../../components/CollectionMasonry'
import CollectionGrid from '../../components/CollectionGrid'
import Background from '../../components/Background'
import MediaQuery from 'react-responsive'
import LastModule from '../../components/LastModule'

const makeDocs = defaultMemoize((objects=[]) => objects.map(({ id }) => id))

const galleryStyle = { height: '100%', position: 'relative', overflowY: 'auto' }

const ModuleGallery = ({ module, style, masonryStyle=null,lastModule }) => {

  // Gallery as slideshow
  if (module.layout === 'slideshow') {
    return <ModuleCarousel style={style} module={module} lastModule={lastModule} />
  }

  // Gallery as grid
  const backgroundColor = get(module, 'background.color')
  const backgroundImage = get(module, 'background.object.id.attachment')
  const backgroundOverlay = get(module, 'background.object.overlay')
  const bbox = get(module, 'background.object.bbox')

  let gridStyle;

  if(module.caption){
    masonryStyle = { height:'calc(100vh - 58px)', padding: '78px 0px'}
    gridStyle = { height:'calc(100vh - 58px - 58px)', padding: '78px 0px', overflow:'auto'}
  }else{
    masonryStyle = { height:'100vh', padding: '78px 0px'}
    gridStyle = { height:'calc(100vh - 58px)', padding: '78px 0px', overflow:'auto'}
  }

  return (
    <div style={style || galleryStyle}>
      <Background
        image={backgroundImage}
        color={backgroundColor}
        overlay={backgroundOverlay}
        bbox={bbox}
      />

    <div className="Module__gallery_cont">

    <MediaQuery minWidth={768}>
        {matches => (
          matches ? (
            <CollectionMasonry
                  showDocLink={true}
                  masonryStyle={masonryStyle}
                  documents={makeDocs(module.objects)}
              />
          ) : (
            <CollectionGrid
             documents={makeDocs(module.objects)}
             gridStyle={gridStyle}
           />
          )
        )}
      </MediaQuery>

    </div>

    {(module.caption) &&
        <div className="Module__object_caption_text card-block Module__gallery_caption">
          <i className="icon-hand Module__object_caption_hand"  />
          <div className="Module__object_caption_text_cont">
            <p className="card-text">
              {module.caption}
            </p>
          </div>
        </div>
      }
      {
        lastModule && <LastModule></LastModule>
      }
    </div>
  )
}

export default pure(ModuleGallery)
