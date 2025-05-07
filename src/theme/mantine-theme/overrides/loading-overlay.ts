import { LoadingOverlay } from '@mantine/core'

export default {
    LoadingOverlay: LoadingOverlay.extend({
        defaultProps: {
            zIndex: 1000,
            overlayProps: {
                radius: 'sm',
                blur: 4
            }
        }
    })
}
