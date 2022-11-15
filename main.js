// original URL 
// const starterpack = "https://test1-api.rescuegroups.org/v5/public/animals/search/available/dogs/?limit=10&page=2&sort=+distance&fields[animals]=name&include=fosters"
console.log("it up")

const baseURL = "https://test1-api.rescuegroups.org/v5"
const workingURL = "https://test1-api.rescuegroups.org/v5/public/animals/search/available/dogs/?limit=200&page=2&fields[dogs]=name&include=fosters"

let dogList = document.createElement("ul")
let body = document.querySelector("body")

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
        
        if (countWords(dog.attributes.name)<3 && dog.attributes.pictureThumbnailUrl && dog.attributes.url && goodSourceCount<36){
            // card generating
            let div = document.createElement('div')
            div.classList.add('card')
            div.style.height = '250px'
            div.style.width = '500px'
            div.style.backgroundColor = 'white'
            div.style.margin = '50px'
            div.style.borderRadius = '20px'
            div.style.border = "5px solid white"
            div.style.display = "inline-grid"
    
            // Text div generator
            let textDiv = document.createElement('div')
            textDiv.style.width = "250px"
            textDiv.style.height = "250px"
            textDiv.style.float = "right"
    
            // Image loading and style
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
            name.style.fontFamily = "Helvetica"
    
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
            age.style.marginRight = "12px"
            age.style.marginTop = "0px"
            age.style.color = "black"
    
            // dog gender
            let sex = document.createElement("p")
            sex.innerText = dog.attributes.sex
    
            // breed
            let breed = document.createElement("p")
            sex.innerText = dog.attributes.breedPrimary
           
            // div.addEventListener(mouse)
            div.addEventListener('mouseover', () => {
                div.classList.add('zoom')
            })
            div.addEventListener('mouseout', () => {
                div.classList.remove('zoom')
            })
    
            // add bone button
            let button = document.createElement('img')
            button.src = "https://s3.envato.com/files/274494335/01.jpg"
            button.style.width = '100px'
            button.addEventListener("click", ()=> {
                window.open(`${dog.attributes.url}`)
            })
            
            //append to the card
            textDiv.append(name, age, sex, breed, button)
            div.append(img, textDiv)
            document.body.append(div)
            
            ++goodSourceCount
        }
        else{
            ++noSourceCount;
        }

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
    console.log(`${noSourceCount} dogs without thumbnails and URLs`)
    console.log(`${goodSourceCount} dogs cards generated`)
}
request()
