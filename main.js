const fetch = require('node-fetch')
const fs = require('fs')
const key = '9bb66184e0c8145384fd2cc0f7b914ada57b4e8fd2e4d6d586adcc27c257a978'
fetch(`https://apiv2.apifootball.com/?action=get_countries&APIkey=${key}`).then(function(res){
    return res.json()
}).then(function(jres){
    var content = JSON.stringify(jres)
    fs.writeFile('country.json', content, function(err){
        if(err){
            return console.log('Error !!')
        }
        console.log('File was saved...')
    })
})
//console.log(countIdWithName)
