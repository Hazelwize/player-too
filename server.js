require('dotenv').config()
const express = require('express')
const cors = require('cors')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const {url} = require('inspector')
const {URLSearchParams} = require('url')
const routes = require('./routes')
const ejs = require('ejs')
const app = express()
const PORT = 3001



app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended:true}))
app.use(express.static('public'))
app.set('view engine','ejs')

app.use('/api', routes)





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

app.listen(process.env.PORT || 3001, () => {
    console.log(`Your server is running on ${PORT}`)
})
// app.get('/api/auth', (req,res)=>{
//     const {code} = req.query
//     const formData = new URLSearchParams()
//     formData.append('client_id', process.env.DISCORD_CLIENT_ID)
//     formData.append('client_secret', process.env.DISCORD_CLIENT_SECRET)
//     formData.append('grant_type', 'authorization_code')
//     formData.append('code', code)
//     formData.append('redirect_uri', 'http://localhost:3001/api/auth')
        
//     fetch(`https://discord.com/api/v10/oauth2/token`,{
//         method: 'post',
//         body: formData,
//         headers: {'Conent-Type': "application/x-www-form-urlencoded"}
//     })
//         .then(results =>{
//            return results.json()
//         })
//         .then(data =>{
//             console.log(data)
//             userToken = data["access_token"]
//             res.redirect('/api/auth/user')
//         })
// })

// app.get('/api/auth/user',(req,res)=>{
//     fetch('https://discord.com/api/v10/oauth2/@me',{
//         method: 'get',
//         headers: {'Authorization': `Bearer ${userToken}`}
//     })
//         .then(results => {
//             return results.json()
//         })
//         .then(data => {
//             console.log(data)
//             res.redirect('/')
//         })
// })




