const { Router } = require('express')
const request = require('request-promise')

const router = Router()

const TOKEN_GITHUB = '3ab7b782c21a3b3f329129654494dc5ca79e977c'

function create (req, res, next) {
  const gist = {
    description: req.body.description,
    public: true,
    files: req.body.files
  }

  const options = {
    url: 'https://api.github.com/gists',
    method: 'POST',
    headers: {
      'Authorization': `token ${TOKEN_GITHUB}`,
      'User-Agent': 'khriztianmoreno'
    },
    json: true,
    body: gist
  }

  return request(options)
    .then(response => res.status(200).json(response))
    .catch(error => res.status(500).json(error))
}

/* GET medium  listing. */
router.post('/gist/', create)

module.exports = router
