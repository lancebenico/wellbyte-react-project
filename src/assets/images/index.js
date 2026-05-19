/** ESM image imports — hashed and optimized by Vite at build time. */

import home1 from './pictures/home1.jpg'
import home2 from './pictures/home2.jpg'
import home3 from './pictures/home3.jpg'
import home4 from './pictures/home4.jpg'

import univlogo from './pictures/univlogo.png'
import collegelogo from './pictures/collegelogo.png'

import adriano from './pictures/adriano.png'
import benico from './pictures/benico.jfif'
import cabanada from './pictures/cabanada.png'
import chua from './pictures/chua.jpg'

import ustLogoPlaceholder from './logos/ust-logo-placeholder.svg'
import cicsLogoPlaceholder from './logos/cics-logo-placeholder.svg'

export const homeImages = {
  home1,
  home2,
  home3,
  home4,
}

export const institutionLogos = {
  ust: univlogo,
  cics: collegelogo,
}

export const logoPlaceholders = {
  ust: ustLogoPlaceholder,
  cics: cicsLogoPlaceholder,
}

export const developerImages = {
  adriano,
  benico,
  cabanada,
  chua,
}

/** @deprecated Use named exports above; kept for constants migration. */
export const HOME_IMAGE_PATHS = homeImages
export const LOGO_PATHS = institutionLogos
export const DEVELOPER_IMAGE_PATHS = developerImages
