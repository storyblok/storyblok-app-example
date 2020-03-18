const { Router } = require('express')
const grantConfig = require('./utils/factory-grant-config')()
const getTokenFromCode = require('./utils/get-token-from-code')
const getStoryblokClient = require('./utils/get-storyblok-client')

const router = Router()

router.get('/stories', function (req, res, next) {
  res.json([])
})

router.get('/callback', async function (req, res, next) {
  const { space_id, code } = req.query

  try {
    const config = {
      grant_type: 'authorization_code',
      code,
      client_id: grantConfig.storyblok.key,
      client_secret: grantConfig.storyblok.secret,
      redirect_uri: grantConfig.storyblok.redirect_uri
    }
    const { access_token, refresh_token } = await getTokenFromCode(
      grantConfig.storyblok.access_url,
      config
    )

    req.session.application_code = code
    req.session.access_token = access_token
    req.session.refresh_token = refresh_token

    res.redirect(`/?space_id=${space_id}`)
  } catch (e) {
    console.log(e)
    res.json({error: e.message})
  }
})

router.get('/explore/:space_id/:resource', async function (req, res, next) {
  const { space_id, resource } = req.params
  const client = getStoryblokClient(req.session.access_token)

  try {
    const response = await client.get(`spaces/${space_id}/${resource}`)

    res.json(response.data)
  } catch (e) {
    console.log(e)
    res.json({error: e.message})
  }
})

module.exports = router
