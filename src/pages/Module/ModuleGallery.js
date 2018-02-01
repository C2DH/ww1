import React from 'react'
import { defaultMemoize } from 'reselect'
import { pure } from 'recompose'
import { get } from 'lodash'
import ModuleCarousel from './ModuleCarousel'
import CollectionMasonry from '../../components/CollectionMasonry'
import Background from '../../components/Background'

const makeDocs = defaultMemoize((objects=[]) => objects.map(({ id }) => id))

const galleryStyle = { height: '100%', position: 'relative' }

const ModuleGallery = ({ module, style, masonryStyle=null }) => {
  // Gallery as slideshow
  if (module.layout === 'slideshow') {
    return <ModuleCarousel style={style} module={module} />
  }

  // Gallery as grid
  const backgroundColor = get(module, 'background.color')
  const backgroundImage = get(module, 'background.object.id.attachment')
  const backgroundOverlay = get(module, 'background.object.overlay')
  const bbox = get(module, 'background.object.bbox')

  if(module.caption){
    masonryStyle = { height:'calc(100vh - 58px)', padding: '78px 0px'}
  }else{
    masonryStyle = { height:'100vh', padding: '78px 0px'}
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
      <CollectionMasonry
            showDocLink={true}
            masonryStyle={ masonryStyle}
            documents={makeDocs(module.objects)}
        />
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
    </div>
  )
}

export default pure(ModuleGallery)
