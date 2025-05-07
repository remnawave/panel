import loadingOverlay from './loading-overlay'
import ringProgress from './ring-progress'
import notification from './notification'
import buttons from './buttons'
import layouts from './layouts'
import tooltip from './tooltip'
import drawer from './drawer'
import badge from './badge'
import table from './table'
import card from './card'
import menu from './menu'

export default {
    ...card,
    ...badge,
    ...buttons,
    ...drawer,
    ...loadingOverlay,
    ...menu,
    ...notification,
    ...ringProgress,
    ...table,
    ...tooltip,
    ...layouts
}
