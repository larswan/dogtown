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
        

        // Text div generator
        let textDiv = document.createElement('div')
        div.classList.add('textDiv')
        
        
        //image loading and style
        let img = document.createElement('img')
        img.src = dog.attributes.pictureThumbnailUrl
       

        // Name generator
        let name = document.createElement('h2')
        name.innerText = dog.attributes.name
        

        // age generator
        let age = document.createElement('p')
        p.classList.add('age')
        if (dog.attributes.ageGroup) {
            age.innerText = "\n" + dog.attributes.ageGroup
        }
        else {
            age.innerText = "\nold enough"
        }
        

        // div.addEventListener(mouse)
        div.addEventListener('mouseover', () => {
            div.classList.add('zoom')
        })
        div.addEventListener('mouseout', () => {
            div.classList.remove('zoom')
        })


        // dog gender
        let sex = document.createElement('p')
        p.classList.add('sex')
        sex.innerText = dog.attributes.sex

        //append to the card
        textDiv.append(name, age, sex)
        div.append(img, textDiv)
        document.body.append(div)
    })

}
request()
