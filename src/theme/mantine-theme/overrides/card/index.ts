import { Card } from '@mantine/core'

import classes from './card.module.css'

export default {
    Card: Card.extend({
        classNames: classes,
        defaultProps: {
            radius: 'md',
            withBorder: true
        }
    })
}
