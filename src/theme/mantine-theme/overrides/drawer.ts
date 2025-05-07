import { DrawerOverlay } from '@mantine/core'

export default {
    DrawerOverlay: DrawerOverlay.extend({
        defaultProps: {
            backgroundOpacity: 0.5,
            blur: 2
        }
    })
}
