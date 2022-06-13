const express = require('express')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const {url} = require('inspector')
const {URLSearchParams} = require('url')




function getDiscordAuthToken(req,res){
    const {code} = req.query
    const formData = new URLSearchParams()
    formData.append('client_id', process.env.DISCORD_CLIENT_ID)
    formData.append('client_secret', process.env.DISCORD_CLIENT_SECRET)
    formData.append('grant_type', 'authorization_code')
    formData.append('code', code)
    formData.append('redirect_uri', 'http://localhost:3001/api/auth')
        
    fetch(`https://discord.com/api/v10/oauth2/token`,{
        method: 'post',
        body: formData,
        headers: {'Conent-Type': "application/x-www-form-urlencoded"}
    })
        .then(results =>{
           return results.json()
        })
        .then(data =>{
            console.log(data)
            userToken = data["access_token"]
            res.redirect('/api/auth/user')
        })
}
let userToken = 0000;
function exchangeDiscordToken(req,res){
    fetch('https://discord.com/api/v10/oauth2/@me',{
        method: 'get',
        headers: {'Authorization': `Bearer ${userToken}`}
    })
        .then(results => {
            return results.json()
        })
        .then(data => {
            console.log(data)
            res.redirect('/')
        })
}


module.exports.exchangeDiscordToken = exchangeDiscordToken;
module.exports.getDiscordAuthToken = getDiscordAuthToken;

