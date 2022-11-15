// original URL 
// const starterpack = "https://test1-api.rescuegroups.org/v5/public/animals/search/available/dogs/?limit=10&page=2&sort=+distance&fields[animals]=name&include=fosters"
console.log("it up")

const baseURL = "https://test1-api.rescuegroups.org/v5"
const workingURL = "https://test1-api.rescuegroups.org/v5/public/animals/search/available/dogs/?limit=200&page=2&fields[dogs]=name&include=fosters"

let dogList = document.createElement("ul")
let body = document.querySelector("body")
const main = document.createElement('main')
document.body.append(main)

function countWords(str) {
    return str.trim().split(/\s+/).length;
}

let request = async () => {
    let goodSourceCount = 0
    let noSourceCount = 0

    let req = await fetch(workingURL, {
        method: "GET",
        withCredentials: true,
        headers: {
            "Authorization": "GqyLWR1K",
            "Content-Type": "application/vnd.api+json"
        }
    }
    )
    let res = await req.json()
    console.log(res.data)

    // dog div generator
    res.data.forEach((dog) => {

        if (countWords(dog.attributes.name) < 3 && dog.attributes.pictureThumbnailUrl && dog.attributes.url && goodSourceCount < 36) {

            // card generating
            let card = document.createElement('div')
            card.classList.add('card')

            // Text div generator
            let textDiv = document.createElement('div')
            textDiv.classList.add('dog-info')
            // textDiv.style.float = "right"

            // dog gender
            let sex = document.createElement('p')
            sex.classList.add('sex')
            sex.innerText = dog.attributes.sex



            //image loading and style
            let img = document.createElement('img')
            img.src = dog.attributes.pictureThumbnailUrl
            img.classList.add("dogImg")

            //adopt me button
            let adoptMeButton = document.createElement('img')
            adoptMeButton.src = "https://i.imgur.com/T86xzBM.png"
            adoptMeButton.classList.add("adoptMeButton")

            //bone click event
            adoptMeButton.addEventListener("click", () => {
                window.open(`${dog.attributes.url}`)
            })
            // adopt me button shakes when mouusehovered
            adoptMeButton.addEventListener("mouseover", () => {
                adoptMeButton.classList.add("shake")
            }
            )
            adoptMeButton.addEventListener("mouseout", () => {
                adoptMeButton.classList.remove("shake")
            })

            // put adopt me button into a div
            let adoptMeButtonDiv = document.createElement("div")
            adoptMeButtonDiv.classList.add("adoptDiv")




            // Name generator
            let name = document.createElement('h2')
            name.innerText = dog.attributes.name

            // age generator
            let age = document.createElement('p')
            if (dog.attributes.ageGroup) {
                age.innerText = dog.attributes.ageGroup
            }
            else {
                age.innerText = "old enough"
            }

            // div.addEventListener(mouse)
            card.addEventListener('mouseover', () => {
                card.classList.add('zoom')
            })
            card.addEventListener('mouseout', () => {
                card.classList.remove('zoom')
            })



            //append to the card
            adoptMeButtonDiv.append(adoptMeButton)
            textDiv.append(name, age, sex, adoptMeButtonDiv)
            card.append(img, textDiv)
            main.append(card)

            ++goodSourceCount
        }
        else {
            ++noSourceCount;
        }

    })
    console.log(`${noSourceCount} dogs without thumbnails and URLs`)
    console.log(`${goodSourceCount} dogs cards generated`)
}

request()
