require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const ejs = require('ejs')
const app = express()
const PORT = 8000


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended:true}))
app.use(express.static('public'))
app.set('view engine','ejs')


app.get('/', (req,res) => {
    res.sendFile(__dirname + '/index.ejs')
})
app.post('/search', (req,res)=>{
    let name = req.body.gameName
    fetch(`https://api.rawg.io/api/games?key=${process.env.RAWGAPIKEY}&search=${name}&genre=multiplayer`,{
        method: 'get',
        headers: {'Content-Type':'application/json'},
    })
        .then(result => result.json())
        .then(games =>{
            console.log(games.results)
            const filteredGames = games.results.filter(e => e.rating !== 0)
            res.render('index.ejs', {games: filteredGames})
        })
        .catch(err => console.error(err))
        

})


app.listen(process.env.PORT || PORT, () => {
    console.log(`Your server is running on port ${PORT}`)
})

