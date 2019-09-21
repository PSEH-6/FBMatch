const key = '9bb66184e0c8145384fd2cc0f7b914ada57b4e8fd2e4d6d586adcc27c257a978'
const fetch = require('node-fetch')
const fs = require('fs')
async function getStat(){
    var res = await fetch(`https://apiv2.apifootball.com/?action=get_countries&APIkey=${key}`)
    const json = await res.json()
    try{
        fs.writeFileSync('country_asynch.json', JSON.stringify(json))
    }
    catch(e){
        console.log('Error!', e)
    }
    let ix =0
    while(json[ix]){
        let MakeURL = `https://apiv2.apifootball.com/?action=get_leagues&country_id=${json[ix].country_id}&APIkey=${key}`
        var res = await fetch(MakeURL)
        const jsonRes = await res.json()
        const finalREs = []
        let idx =0
        while(jsonRes[idx]){
            if(jsonRes[idx].error){
                idx++
                continue
            }
            finalREs.push({
                "league_id": jsonRes[idx].league_id,
                "league_name": jsonRes[idx].league_name
            })
            let makeTeamUrl = `https://apiv2.apifootball.com/?action=get_teams&league_id=${jsonRes[idx].league_id}&APIkey=${key}`
            let makeOverAllLeaguPositionUrl = `https://apiv2.apifootball.com/?action=get_standings&league_id=${jsonRes[idx].league_id}&APIkey=${key}`
            var res = await fetch(makeTeamUrl)
            res = await res.json()
            let tdx =0
            var teamRes = []
            while(res[tdx]){
                teamRes.push({
                    "team_key": res[tdx].team_key,
                    "team_name": res[tdx].team_name
                })
                tdx++
            }
            try{
                fs.writeFileSync('team_asynch.json', JSON.stringify(teamRes))
            }
            catch(e){
                console.log(e)
            }
            var res = await fetch(makeOverAllLeaguPositionUrl)
            res = await res.json()
            let odx =0
            var leaguePositionRes = []
            while(res[odx]){
               leaguePositionRes.push({
                   "league_name": res[odx].league_name,
                   "overall_league_position": res[odx].overall_league_position 
               }) 
               odx++
            }
            try{
                fs.writeFileSync('overall_asynch.json', JSON.stringify(leaguePositionRes))
            }
            catch(e){
                console.log(e)
            }
            idx++
        }
        try{
            fs.appendFileSync('league_asynch.json', JSON.stringify(finalREs))
        }
        catch(e){
            console.log('Error while synching!', e)
        }
        ix++
    }
}
getStat()


