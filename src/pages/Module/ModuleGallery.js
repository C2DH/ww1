import React from 'react'
import { defaultMemoize } from 'reselect'
import { pure } from 'recompose'
import { get } from 'lodash'
import ModuleCarousel from './ModuleCarousel'
import CollectionMasonry from '../../components/CollectionMasonry'
import Background from '../../components/Background'

const makeDocs = defaultMemoize(objects => objects.map(({ id }) => id))

const ModuleGallery = ({ module }) => {
  // Gallery as slideshow
  if (module.layout === 'slideshow') {
    return <ModuleCarousel module={module} />
  }

  // Gallery as grid
  const backgroundColor = get(module, 'background.color')
  const backgroundImage = get(module, 'background.object.id.attachment')
  const backgroundOverlay = get(module, 'background.object.overlay')

  return (
    <div style={{ height: '100%', position: 'relative' }}>
      <Background image={backgroundImage} color={backgroundColor} overlay={backgroundOverlay} />
      <CollectionMasonry
        showDocLink={true}
        masonryStyle={{ paddingTop: 100,paddingBottom:80 }}
        documents={makeDocs(module.objects)}
      />
      <div className="ModuleObject__caption_video">
        <span>
          <i className="icon-hand Mods__DocumentOnly_Card_icon"  />
          <span> {module.caption}</span>
        </span>
      </div>
    </div>
  )
}

export default pure(ModuleGallery)
