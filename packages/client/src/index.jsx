import React from 'react'
import { render } from 'react-dom'

// Polyfill APIs for older browsers
import 'whatwg-fetch'
import 'url-search-params-polyfill'

import App from './App'

render(<App />, document.getElementById('root'))
