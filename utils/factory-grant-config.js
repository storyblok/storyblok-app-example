const SHA256 = require('crypto-js/sha256')
const uuid = require('uuid/v4')

const getConfig = () => {
  const codeIdentifier = uuid()

  return {
    defaults: {
      protocol: 'http',
      host: 'http://localhost:3000'
    },
    storyblok: {
      key: process.env.CONFIDENTIAL_CLIENT_ID,
      secret: process.env.CONFIDENTIAL_CLIENT_SECRET,
      redirect_uri: process.env.CONFIDENTIAL_CLIENT_REDIRECT_URI,
      callback: '/callback',
      authorize_url: 'https://app.storyblok.com/oauth/authorize',
      access_url: 'https://app.storyblok.com/oauth/token',
      oauth: 2,
      scope: 'read_content write_content',
      custom_params: {
        code_chalenge: SHA256(codeIdentifier).toString(),
        code_chalenge_method: 'S256',
        state: codeIdentifier
      }
    }
  }
}

module.exports = getConfig
