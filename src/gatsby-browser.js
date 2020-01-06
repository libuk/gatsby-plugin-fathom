import { isExcludedHostname } from './utils'

exports.onRouteUpdate = ({ location }, { excludedHostnames }) => {
  if (
    process.env.NODE_ENV === 'production' &&
    typeof fathom !== 'undefined' &&
    !isExcludedHostname(excludedHostnames, location.hostname)
  ) {
    fathom('trackPageview')
  }
}
