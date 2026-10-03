fetch('https://api-twitter.darkmira.fr')
    .then((res) => res.json())
    .then((data) => {
         function parseTweet (text) {
            text = text.replace(/[A-Za-z]+:\/\/[A-Za-z0-9_-]+\.[A-Za-z0-9_:%&~\?\/.=-]+/g, function(url) {
                return url.link(url)
            })
            text = text.replace(/[@]+[A-Za-z0-9_-]+/g, function(u) {
                var username = u.replace("@","")
                return u.link("http://twitter.com/"+username)
            })
            text = text.replace(/[#]+[A-Za-z0-9_-]+/g, function(t) {
                var tag = t.replace("#","%23")
                return t.link("http://twitter.com/search?q="+tag)
            })
            return text;
        }
        let output = '';
        data.forEach((data) => {
            output += `
         <div class="media media-twitter" style="padding-top: 0px; padding-bottom: 0px;">
            <li>
                <p >${ parseTweet(data.text)}</p>
            </li>
         </div>`
        })
        document.querySelector('.twitter-darkmira').innerHTML = output
    })
