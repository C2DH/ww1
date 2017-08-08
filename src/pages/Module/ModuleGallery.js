import React from 'react'
import ModuleCarousel from './ModuleCarousel'

// TODO: switch between carousel and masonry
const ModuleGallery = ({ module }) => {
  console.log('Gallery Module', module)
  return <ModuleCarousel module={module} />
}

export default ModuleGallery
