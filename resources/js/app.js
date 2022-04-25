require('./bootstrap')

import { createInertiaApp } from '@inertiajs/inertia-react'
import { InertiaProgress } from '@inertiajs/progress'
import axios from 'axios'
import { render } from 'react-dom'
import { SWRConfig } from 'swr'

const appName = 'Memeboard'

createInertiaApp({
  title: (title) => `${title} - ${appName}`,
  resolve: (name) => require(`./pages/${name}`),
  setup({ el, App, props }) {
    return render(
      <SWRConfig
        value={{
          fetcher: (url) => axios.get(url).then((res) => res.data),
        }}
      >
        <App {...props} />
      </SWRConfig>,
      el
    )
  },
})

InertiaProgress.init({ color: '#4B5563' })
