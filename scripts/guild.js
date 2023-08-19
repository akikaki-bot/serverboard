

function ServerBoard (){}

ServerBoard.prototype.getQuery = () => {
    return new URLSearchParams(window.location.search).get(`id`) ?? null
}

ServerBoard.prototype.init = async () => {
    let IsNotDate = false
    const guildId = new ServerBoard().getQuery()
    if(!guildId) {
         document.getElementById('guilds').innerHTML = `<h1> 400 Bad Request </h1>`
         document.getElementsByClassName('section').item(0).setAttribute('class', "hide")
         setTimeout(() => {
              location.href = "./index.html"
         }, 1000)
         return;
    }
    const guild = await (await fetch(`https://api--projectkeew.repl.co/v1/guilds/${guildId}`)).json()
    if(typeof guild.notfound !== "undefined") {
         document.getElementById('guilds').innerHTML = `<h1 class="title is-1"> 404 Not Found </h1>`
         document.getElementsByClassName('section').item(0).setAttribute('class', "hide")
         setTimeout(() => {
              location.href = "./index.html"
         }, 1000)
         return;
    }

    if(typeof guild.infomations.lastUpdated === "undefined") IsNotDate = true
    const date = new Date(guild.infomations.lastUpdated)

    document.getElementsByClassName('loader').item(0).setAttribute('class', "hide")

    document.getElementById('serverTitle').innerText += " / "+guild.name
    document.getElementById('t').innerText = guild.name
    document.getElementById('id').innerText = guild.guildId
    document.getElementById('tags').innerHTML = `${guild.infomations.tags.map(v => `<a class="tag" href="./search.html?tag=${v}">${v}</a>`).join(' ')}`
    document.getElementById('lastUpdate').innerText = `${IsNotDate ? "最終更新 : 不明" : "最終更新 "+date.getMonth()+"/"+date.getDate()+" "+date.getHours()+":"+(date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes())}`
    document.getElementById('content').innerText = guild.infomations.description_markdown
    document.getElementById('invite').setAttribute('href',`https://discord.gg/${guild.inviteCode}`)
    /*
    document.getElementById('guilds').innerHTML = `
        <h1> ${guild.name} (${guild.guildId})</h1> 
        <div class="mkdownDescription">
             ${guild.infomations.description_markdown} 
        </div>
        <a href="https://discord.gg/${guild.inviteCode}"> このサーバーに参加する </a>
        <div class="tags">
            ${guild.infomations.tags.join(' / ')}
        </div>
        ` */
}

window.onload = () => {
    new ServerBoard().init()
}