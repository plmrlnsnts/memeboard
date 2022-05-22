require('./bootstrap')

import { createInertiaApp } from '@inertiajs/inertia-react'
import { InertiaProgress } from '@inertiajs/progress'
import { render } from 'react-dom'
import AppWrapper from './components/app-wrapper'

const appName = 'Memeboard'

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => require(`./pages/${name}`),
  setup({ el, App, props }) {
    return render(<AppWrapper App={App} {...props} />, el)
  },
})

InertiaProgress.init({ color: '#4B5563' })
