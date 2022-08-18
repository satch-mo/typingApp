// basic tidbit targets
const tidbitBtn = document.getElementById("get-tidbit")
const myTidbitBtn = document.getElementById("get-my-tidbit")
const tidbitContainer = document.getElementById("tidbit-container")
const compareBtn = document.getElementById("compare-button")
const closeModal = document.getElementById("close-modal")
const createBtn = document.getElementById("add-tidbit")

//Cookie
const cookieArr = document.cookie.split("=")
const userId = cookieArr[1];

// create tidbit targets
const createContainer = document.getElementById("create-container")
const createInput = document.getElementById("create-tidbit-input")
const createInputBtn = document.getElementById("create-button")
const successMsg = document.getElementById("success-msg")

// modal targets
let modalBody = document.getElementById(`modal-body`)
let modalTitle = document.getElementById("modal-title")

// score targets
let scoreBody = document.getElementById('score-body')


const headers = {
    'Content-Type': 'application/json'
}


const baseUrl = "http://localhost:8080/tidbits"


// logout
function handleLogout(){
    let c = document.cookie.split(";");
    for(let i in c){
        document.cookie = /^[^=]+/.exec(c[i])[0]+";expires=Thu, 01 Jan 1970 00:00:00 GMT"
    }
}

// get random tidbit - routes to createTidbit
async function getTidbit(tid) {
    document.getElementById("tidbit-input").value = ''
    function getRandom(min, max){
        return min + Math.floor(Math.random()*(max-min + 1));
    }
    let random = getRandom(1,10)

    await fetch(`${baseUrl}/${random}`, {
        method: "GET",
        headers: headers
    })
        .then(response => response.json())
        .then(data => createTidbit(data))
        .catch(err => console.error(err))
}

// get myTidbit (tidbits saved by user - only visible to user)
async function getMyTidbit(tid) {
    document.getElementById("tidbit-input").value = ''
    await fetch(`${baseUrl}/userTidbit/${userId}`, {
        method: "GET",
        headers: headers
    })
        .then(response => response.json())
        .then(data => createTidbit(data))
        .catch(err => console.error(err))
}

// pulls tidbit onto screen
const createTidbit = (array) => {
    tidbitContainer.innerHTML = ''
        let tidbitCard = document.createElement("div")
        tidbitCard.classList.add("m-2")
        tidbitCard.innerHTML = `
            <div class="card d-flex" style="width: 30rem; height: 12rem; background-color: #6F2DBD;"">
                <div class="card-body d-flex flex-column justify-content-between" style="height: available">
                    <p class="card-text" id= "tidbit" style="color: #B9FAF8;">${array.body}</p>  
                    <div class="d-flex justify-content-between">
                    </div>
                </div>
            </div>
        `
        tidbitContainer.append(tidbitCard);
}

// global score variable
let score = 0;

// compare text functionality
const compareText = (e) => {
    e.preventDefault();
    let displayed = document.getElementById("tidbit").innerHTML
    let attempt = document.getElementById("tidbit-input").value

    if (displayed == attempt){
        score += 120;
        modalTitle.innerText = 'Nice work!';
        modalBody.innerText = `You now have ${score} points!`
    } else {
        modalTitle.innerText = 'Try again!';
        modalBody.innerText = 'Each incorrect attempt deducts 50 points from your overall score.';
        score -= 50;
    }


    showScore();
}

// displays score on screen
const showScore = () =>{
    scoreBody.innerText = ''
    scoreBody.innerText = `Score: ${score}`;
}


// shows create tidbit text area
const showTextArea = (e) => {
    e.preventDefault()
    createContainer.setAttribute("style" , "display: block;" );
}

// hides create tidbit text area
const closeTextArea = (e) => {
    createContainer.setAttribute("style" , "display: none;" );
}


const handleCreateSubmit = async (e) => {
    e.preventDefault()
    let bodyObj = {
        body: createInput.value
    }
    await addTidbit(bodyObj);
    createInput.value = ''
    closeTextArea();
}


// create new tidbit to database
const addTidbit = async (obj) => {
    const response = await fetch(`${baseUrl}/user/${userId}`, {
            method: "POST",
            body: JSON.stringify(obj),
            headers: headers
    })
            .catch(err => console.error(err.message))
        if (response.status === 200) {
            modalTitle.innerText = 'Tidbit added successfully!';
            modalBody.innerText = "You can now click Get My Tidbit button to get a random tidbit you've created!"
        }
}



tidbitBtn.addEventListener("click", getTidbit)
myTidbitBtn.addEventListener("click", getMyTidbit)
compareBtn.addEventListener("click", compareText)
closeModal.addEventListener("click", getTidbit)
createBtn.addEventListener("click", showTextArea)
createInputBtn.addEventListener("click", handleCreateSubmit)