console.log("it up")
const baseURL = "https://test1-api.rescuegroups.org/v5"
const starterpack = "https://test1-api.rescuegroups.org/v5/public/animals/search/available/dogs/?limit=10&page=2&sort=+distance&fields[animals]=name&include=fosters"
const workingURL = "https://test1-api.rescuegroups.org/v5/public/animals/search/available/dogs/?limit=16&page=2&fields[dogs]=name&include=fosters"


let dogList = document.createElement("ul")
let body = document.querySelector("body")

let request = async () => {

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

    res.data.forEach((dog) => {


        // card generating
        let div = document.createElement('div')
        div.classList.add('card')
        div.style.height = '250px'
        div.style.width = '500px'
        div.style.backgroundColor = 'white'
        div.style.margin = '50px'
        div.style.borderRadius = '20px'
        div.style.border = "7px solid white"
        //div.style.display = "inline-grid"

        // Text div generator
        let textDiv = document.createElement('div')
        textDiv.style.width = "250px"
        textDiv.style.height = "250px"
        textDiv.style.float = "right"

        //image loading and style
        let img = document.createElement('img')
        img.src = dog.attributes.pictureThumbnailUrl
        img.style.width = "250px"
        img.style.height = "250px"
        img.style.objectFit = "cover"
        img.style.borderRadius = '20px 0px 0px 20px'


        // Name generator
        let name = document.createElement('h2')
        name.innerText = dog.attributes.name
        name.style.float = "right"
        name.style.textAlign = "right"
        name.style.marginRight = "15px"
        name.style.marginTop = "10px"
        name.style.marginBottom = "0px"

        // age generator
        let age = document.createElement('p')
        if (dog.attributes.ageGroup) {
            age.innerText = "\n" + dog.attributes.ageGroup
        }
        else {
            age.innerText = "\nold enough"
        }
        age.style.float = "right"
        age.style.marginRight = "0 auto"
        age.style.textAlign = "right"
        age.style.marginRight = "15px"
        age.style.marginTop = "0px"
        age.style.color = "black"

        // div.addEventListener(mouse)
        div.addEventListener('mouseover', () => {
            div.classList.add('zoom')
        })
        div.addEventListener('mouseout', () => {
            div.classList.remove('zoom')
        })


        // dog gender
        let sex = document.createElement("p")
        sex.innerText = dog.attributes.sex

        //append to the card
        textDiv.append(name, age, sex)
        div.append(img, textDiv)
        document.body.append(div)
    })

}
request()
