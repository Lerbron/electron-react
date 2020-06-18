import Loadable from 'react-loadable'
import React from 'react'

// import Loading from 'components/loadingComponent'

export default Loadable({
  loader: () => import('./Home'),
  loading: () => (<div>loading...</div>)
});
