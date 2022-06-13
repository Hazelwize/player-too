const {Router} = require('express')
const { getDiscordAuthToken, exchangeDiscordToken } = require('../../controllers/auth')
const router = Router()


router.get('/', getDiscordAuthToken)
router.get('/user', exchangeDiscordToken)


module.exports = router;