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
            div.addEventListener('mouseover', () => {
                div.classList.add('zoom')
            })
            div.addEventListener('mouseout', () => {
                div.classList.remove('zoom')
            })
            
    
            // Text div generator
            let textDiv = document.createElement('div')
            div.classList.add('textDiv')
            
            // Image loading and style
            let img = document.createElement('img')
            img.src = dog.attributes.pictureThumbnailUrl
    
            // Name generator
            let name = document.createElement('h2')
            name.innerText = dog.attributes.name
    
            // age generator
            let age = document.createElement('p')
            if (dog.attributes.ageGroup) {
                age.innerText = "\n" + dog.attributes.ageGroup
            }
            else {
                age.innerText = "\nold enough"
            }
                
            // breed
            let breed = document.createElement("p")
            breed.innerText = dog.attributes.breedPrimary

            // dog gender
            let sex = document.createElement('p')
            sex.classList.add('sex')
            sex.innerText = dog.attributes.sex
    
        
           
            
            
            //append to the card
            textDiv.append(name, age, sex, breed)
            div.append(img, textDiv)
            document.body.append(div)
            
            ++goodSourceCount
        }
        else{
            ++noSourceCount;
        }



    })
    console.log(`${noSourceCount} dogs without thumbnails and URLs`)
    console.log(`${goodSourceCount} dogs cards generated`)
}
request()
