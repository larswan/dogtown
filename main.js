// original URL
// const starterpack = "https://test1-api.rescuegroups.org/v5/public/animals/search/available/dogs/?limit=10&page=2&sort=+distance&fields[animals]=name&include=fosters"
console.log("it up")
const baseURL = "https://test1-api.rescuegroups.org/v5"
const workingURL = "https://test1-api.rescuegroups.org/v5/public/animals/search/available/dogs/?limit=200&page=2&fields[dogs]=name&include=fosters"
const form = document.getElementById('form')
const breedForm = document.getElementById("breedForm")
let dogList = document.createElement("ul")
let body = document.querySelector("body")
const main = document.createElement('main')
document.body.append(main)
// function select () {
//     ('select').selectric();
// };



function cardMaker(dog) {// card generating
    let card = document.createElement('div')
    card.classList.add('card')
    // Text div generator
    let textDiv = document.createElement('div')
    textDiv.classList.add('dog-info')
    // Name generator
    let name = document.createElement('h2')
    name.innerText = dog.attributes.name
    // dog gender
    let sex = document.createElement('p')
    sex.classList.add('sex')
    sex.innerText = dog.attributes.sex
    // age generator
    let age = document.createElement('p')
    age.innerText = dog.attributes.ageGroup

    // breed generator
    let breed = document.createElement('p')
    breed.innerText = dog.attributes.breedPrimary
    console.log(dog.attributes.breedPrimary)

    let isTerrier = (dog.attributes.breedPrimary == "American Staffordshire Terrier")
    let isCattleDog = (dog.attributes.breedPrimary == "Australian Cattle Dog/Blue Heeler")
    console.log(isCattleDog, isTerrier)
    if (isTerrier) {
        breed.innerText = "Staffordshire Terrier"
    }
    if (isCattleDog) {
        breed.innerText = "Australian Cattle Dog"
    }

    //image loading and style
    let img = document.createElement('img')
    img.src = dog.attributes.pictureThumbnailUrl
    img.classList.add("dogImg")
    //adopt me button
    let adoptMeButton = document.createElement('img')
    adoptMeButton.src = "https://github.com/larswan/dogtown/blob/main/dog%20bone%20button.png?raw=true"
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
    // clears cards on form submit
    form.addEventListener("submit", (e) => {
        e.preventDefault();
        card.remove();
    })
    // div.addEventListener(mouse)
    card.addEventListener('mouseover', () => {
        card.classList.add('zoom')
    })
    card.addEventListener('mouseout', () => {
        card.classList.remove('zoom')
    })
    //append to the card
    adoptMeButtonDiv.append(adoptMeButton)
    textDiv.append(name, age, sex, breed,adoptMeButtonDiv)
    card.append(img, textDiv)
    document.getElementById("card-container").append(card)
}
// const breedList = (dog) => {
//     const breedSet = new Set();
//     breedSet.add(dog)
//     const breedArray = Array.from(breedSet)
//     console.log(breedSet)
// }
let allBreeds = []
function countWords(str) {
    return str.trim().split(/\s+/).length;
}
let initialRequest = async () => {
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
    // Page load card generator
    res.data.forEach((dog) => {
        if (countWords(dog.attributes.name) < 2 && dog.attributes.pictureThumbnailUrl && dog.attributes.url && goodSourceCount < 36 && dog.attributes.sex && dog.attributes.ageGroup) {
            cardMaker(dog)

            const breed = dog.attributes.breedPrimary
            if (breed) {
                allBreeds.push(breed)
            }

            ++goodSourceCount
        }
        else {
            ++noSourceCount;
        }
    })
    const breedSet = new Set(allBreeds)

    const breedArray = Array.from(breedSet)
    breedArray.forEach((breed) => {
        let breedOptions = document.createElement("option")
        breedOptions.textContent = breed
        breedOptions.value = breed
        breedForm.appendChild(breedOptions)
    })
    console.log(`${noSourceCount} dogs without thumbnails and URLs`)
    console.log(`${goodSourceCount} dogs cards generated`)
}
let formRequest = async () => {
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
    // Page load card generator
    res.data.forEach((dog) => {
        let sexMatch;
        let ageMatch;
        let breedMatch;
        
        console.log(ageMatch, dog.attributes.ageGroup, sexMatch, dog.attributes.sex, breedMatch, dog.attributes.breedPrimary)
        if (ageMatch && sexMatch && breedMatch && countWords(dog.attributes.name) < 3 && dog.attributes.pictureThumbnailUrl && dog.attributes.url && goodSourceCount < 36) {
            cardMaker(dog)
            ++goodSourceCount
        }
        else {
            ++noSourceCount;
        }
    })
    if (goodSourceCount === 0) {
        alert("That's ruff")
    }
    console.log(`${noSourceCount} dogs without thumbnails and URLs`)
    console.log(`${goodSourceCount} dogs cards generated`)
}
// Form submit dog generator
form.addEventListener("submit", (e) => {
    e.preventDefault();
    // if(body.hasChildNodes()){
    //     body.removeChild(body.firstChild)
    //     console.log("ran")
    // }
    // document.getElementById('div').remove()
    console.log("ok its not actually refreshing")
    formRequest()
})
initialRequest()