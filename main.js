const fetch = require('node-fetch')
const fs = require('fs')
const key = '9bb66184e0c8145384fd2cc0f7b914ada57b4e8fd2e4d6d586adcc27c257a978'
fetch(`https://apiv2.apifootball.com/?action=get_countries&APIkey=${key}`).then(function(res){
    return res.json()
}).then(function(jres){
    var ix =0
    while(jres[ix]){
        console.log(jres[ix].country_id)
        let makeURL = `https://apiv2.apifootball.com/?action=get_leagues&country_id=${jres[ix].country_id}&APIkey=${key}`
        console.log(makeURL)
        fetch(makeURL).then(function(res){
            return res.json()
        }).then(function(jres){
            let ix =0
            var content = new Array()
            while(jres[ix]){
                content.push({
                    "league_id":jres[ix].league_id,
                    "league_name":jres[ix].league_name
                })
                ix++
            }
            content = JSON.stringify(content)
            fs.appendFileSync('leauge.json', content, function(err){
                if(err){
                    return console.log('Error !!')
                }
                console.log('League File saved...')
            })
        })
        ix++
    }
    var content = JSON.stringify(jres)
    //console.log(content[0])
    fs.writeFileSync('country.json', content, function(err){
        if(err){
            return console.log('Error !!')
        }
        console.log('Country File was saved...')
    })
})

/**
 * 
 * Fetch LeagueId based on country code
 * 
 */


//console.log(countIdWithName)
