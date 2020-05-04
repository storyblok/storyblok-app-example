const StoryblokClient = require('storyblok-js-client')
const getTokenFromCode = require('./get-token-from-code')
const grantConfig = require('./factory-grant-config')()
const createAuthRefreshInterceptor = require('axios-auth-refresh')

/**
 * @method getStoryblokClient
 * @param  {Object} session Express session
 * @return {StoryblokJSClient}
 */
const getStoryblokClient = session => {
  const clientInstance = new StoryblokClient({
    oauthToken: `Bearer ${session.access_token}`
  })

  const refreshAuthLogic = failedRequest => getTokenFromCode(
    grantConfig.storyblok.access_url,
    {
      grant_type: 'refresh_token',
      refresh_token: session.refresh_token,
      client_id: grantConfig.storyblok.key,
      client_secret: grantConfig.storyblok.secret,
      redirect_uri: grantConfig.storyblok.redirect_uri
    }).then(tokenRefreshResponse => {
      session.access_token = tokenRefreshResponse.access_token
      session.refresh_token = tokenRefreshResponse.refresh_token
      failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.access_token
      return Promise.resolve()
    })

  createAuthRefreshInterceptor.default(clientInstance.client, refreshAuthLogic)

  return clientInstance
}

module.exports = getStoryblokClient
