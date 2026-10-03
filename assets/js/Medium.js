fetch('https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/darkmirafr')
    .then((res) => res.json())
    .then((data) => {
        const res = data.items
        const posts = res.filter(item => item.categories.length > 0)

        function toText(node) {
            let tag = document.createElement('div')
            tag.innerHTML = node
            node = tag.innerText

            return node
        }
        function shortenText(text,startingPoint ,maxLength) {
            return text.length > maxLength?
                text.slice(startingPoint, maxLength):
                text
        }

        function formatDate (input) {
            var datePart = input.match(/\d+/g),
                year = datePart[0],
                month = datePart[1], day = datePart[2];

            return day+'/'+month+'/'+year;
        }

        let output = '';
        posts.slice(0,2).forEach((item) => {
            output += `
         <li>
            <a href="${item.link}">
            <h5>${shortenText(item.title)}</h5>
            <a/>
            <p >${formatDate(item.pubDate)}</p>
            <p>${shortenText(toText(item.content), 60, 200) + '...'}</p>`
            item.categories.forEach((category) => {
            output += `
            <a class="badge-tag" href="https://medium.com/darkmirafr/search?q=${category}">
            <span class="badge badge badge-tag">${category}</span>
            </a>`
            })

            output += `</li>`
        })
        document.querySelector('.blog-darkmira').innerHTML = output
    })
