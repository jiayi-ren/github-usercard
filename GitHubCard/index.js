/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/
/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/


/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/

const followersArray = [];

followersArray.push("tetondan")
followersArray.push("dustinmyers")
followersArray.push("justsml")
followersArray.push("luishrd")
followersArray.push("bigknell")

/// Generate Card for github user ///
function GitCard(gitUser, calendar=null){
  const card = document.createElement("div")
  const userImg = document.createElement("img")
  const cardInfo = document.createElement("div")
  const name = document.createElement("h3")
  const userName = document.createElement("p")
  const location = document.createElement("p")
  const profile = document.createElement("p")
  const userURL = document.createElement("a")
  const followers = document.createElement("p")
  const following = document.createElement("p")
  const bio = document.createElement("p")

  card.appendChild(userImg)
  card.appendChild(cardInfo)
  cardInfo.appendChild(name)
  cardInfo.appendChild(userName)
  cardInfo.appendChild(location)
  cardInfo.appendChild(profile)
  cardInfo.appendChild(followers)
  cardInfo.appendChild(following)
  cardInfo.appendChild(bio)

  card.classList.add("card")
  cardInfo.classList.add("card-info")
  name.classList.add("name")
  userName.classList.add("username")
  
  userImg.setAttribute("src", gitUser.avatar_url)
  userURL.setAttribute("href", gitUser.html_url)

  name.textContent = gitUser.name
  userName.textContent = gitUser.login
  location.textContent = `Location ${gitUser.location}`
  profile.textContent = `Profile: `
  userURL.textContent = `${gitUser.html_url}`
  followers.textContent = `Followers: ${gitUser.followers}`
  following.textContent = `Following: ${gitUser.following}`
  bio.textContent = `Bio: ${gitUser.bio}`

  profile.appendChild(userURL)

  if(calendar){
    card.appendChild(calendar)
  }

  return card
} 

function GetGitCalendar(username){
  const calendarDiv = document.createElement("div")
  const calendar = document.createElement("img")

  calendarDiv.appendChild(calendar)
  calendar.setAttribute("src", `https://ghchart.rshah.org/${username}`)

  calendar.style.width = "100%"
  calendar.style.marginTop = "20px"

  return calendarDiv
}

/// Generate Github card by username ///
function GetGitHub(username){
   axios.get(`https://api.github.com/users/${username}`)
  .then(
    response =>{
      const cards = document.querySelector(".cards")
      cards.appendChild(GitCard(response.data, GetGitCalendar(response.data.login)))
    }
  )
  .catch(
    error =>{
      console.log(error)
     }
  )
}

/// Generate user's followers github cards ///
function GetFollowersGit(username) {
  followersArray.forEach( follower =>{
    axios.get(`https://api.github.com/users/${follower}`)
    .then(
      response =>{
        const cards = document.querySelector(".cards")
        cards.appendChild(GitCard(response.data, GetGitCalendar(response.data.login)))
      }
    )
    .catch(
      error =>{
        console.log(error)
      }
    )
  })
}

/// Get user's followers and their cards ///
function GetFollowers(username){
  axios.get(`https://api.github.com/users/${username}/followers`)
  .then(
    response =>{
      response.data.forEach( follower =>{
        followersArray.push(follower.login)
      })
    }
  )
  .then(
    response =>{
      GetFollowersGit(username)
    }
  )
  .catch(
    error =>{
      console.log(error)
    }
  )
}

const user = "jiayi-ren"
GetGitHub(user)
GetFollowers(user)
