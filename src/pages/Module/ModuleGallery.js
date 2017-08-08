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
    <div style={{ height: '100%' }}>
      <Background image={backgroundImage} color={backgroundColor} overlay={backgroundOverlay} />
      <CollectionMasonry
        masonryStyle={{ paddingTop: 100 }}
        documents={makeDocs(module.objects)}
      />
    </div>
  )
}

export default pure(ModuleGallery)
