
const OfficalServer = ["884700738603859978"]



function Search(){}


Search.prototype.init = async () => {
    const Query = new URLSearchParams(window.location.search).get(`tag`) 
    document.getElementById('searchQuery').innerText = Query

    const Servers = await (await fetch(`https://api--projectkeew.repl.co/v1/guilds`)).json()
    
    new Search().debugText(`[Debug] : ${Query} in ${Servers.guilds.join(',')} fetching...`)
    Servers.guilds.map(v => {
        fetch(`https://api--projectkeew.repl.co/v1/guilds/${v}`).then(res => res.ok ? res.json() : void 0)
        .then(detailServer => {
           const Filter = detailServer.infomations.tags.filter(v => v === Query)
           if(Filter.length === 0) return;
           console.log(`Guild ${v} in `+Filter)
           let IsNotDate = false
           let Verify = false
           const finder = OfficalServer.find(x => x === v)
           if(finder) Verify = true
           const Olddescription = (detailServer.infomations.description_markdown)
           const description = Olddescription.length > 30 ? Olddescription.substring(0, 30) + "\n<span class='tenten'>...</span>" : Olddescription
           if(typeof detailServer.infomations.lastUpdated === "undefined") IsNotDate = true
           const date = new Date(detailServer.infomations.lastUpdated)
            document.getElementById('guilds').innerHTML += `
                <div class="box" >
                    <a class="shadow" href="./guild.html?id=${v}">
                        <span class="title"> ${detailServer.name} ${Verify ? `<i class="fa-solid fa-check"></i>` : ""} </span>
                        <span class="subtitle">(${v})</span>
                    </a>
                    <br>
                    <span style="font-weight:bold">${Verify ? "このサーバーは公式です。" : ""}</span>
                    <hr>
                    <div class="description content">
                    <br>
                    <blockquote>
                        ${description.replaceAll('\n', "<br>")} 
                    </blockquote>
                    </div>
                    <p>${IsNotDate ? "最終更新 : 不明" : "<p> 最終更新 "+date.getMonth()+"/"+date.getDate()+" "+date.getHours()+":"+(date.getMinutes() < 10 ? "0"+date.getMinutes() : date.getMinutes())+"</p>"}
                </div>
            `
            console.log(`[Worker] Successfully fetched the server : ${v}`)
        })
        new Search().busySleep(10)
    })
}

Search.prototype.debugText = ( text ) => {
    console.log(text)
}

Search.prototype.busySleep = function sleep(waitMsec) {
    const startMsec = new Date();
    while (new Date() - startMsec < waitMsec);
}

window.onload = () => {
    new Search().init()
}