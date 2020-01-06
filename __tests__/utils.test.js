import { createTrackingSnippet, isExcludedHostname } from '../src/utils'

test('setting the tracking URL', () => {
  const html = createTrackingSnippet({
    trackingUrl: 'alexlafroscia.com'
  })

  expect(html).toContain('//alexlafroscia.com/tracker.js')
})

describe('when the tracking URL is not provided', () => {
  test('defaulting to the CDN URL', () => {
    const html = createTrackingSnippet({
      siteId: 'foo-bar'
    })

    expect(html).toContain('//cdn.usefathom.com/tracker.js')
  })

  test('ensuring that a tracking ID is provided', () => {
    expect(function() {
      createTrackingSnippet({})
    }).toThrow()
  })
})

describe('setting the site ID', () => {
  test('when the ID is not provided', () => {
    const html = createTrackingSnippet({
      trackingUrl: 'alexlafroscia.com'
    })

    expect(html).not.toContain("fathom('set', 'siteId'")
  })

  test('when the ID is provided', () => {
    const html = createTrackingSnippet({
      trackingUrl: 'alexlafroscia.com',
      siteId: 'foo-bar'
    })

    expect(html).toContain("fathom('set', 'siteId', 'foo-bar')")
  })
})

describe('testing against excluded hostnames', () => {
  const excludedHostnames = ['localhost', 'netlify.com']

  test('when hostname is in excluded hostnames', () => {
    const isExcluded = isExcludedHostname(excludedHostnames, 'localhost')

    expect(isExcluded).toBe(true)
  })

  test('when hostname is not in excluded hostnames', () => {
    const isExcluded = isExcludedHostname(excludedHostnames, 'localghost')

    expect(isExcluded).toBe(false)
  })

  test('when hostname contains subdomain and is in excluded hostnames', () => {
    const isExcluded = isExcludedHostname(
      excludedHostnames,
      '5e134a681339000ddc5e6c--nostalgic-ritchie-f3f90f.netlify.com'
    )

    expect(isExcluded).toBe(true)
  })
})
