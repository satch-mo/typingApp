const tidbitBtn = document.getElementById("get-tidbit")
const tidbitContainer = document.getElementById("tidbit-container")
const compareBtn = document.getElementById("compare-button")
const closeModal = document.getElementById("close-modal")
const createBtn = document.getElementById("add-tidbit")

let modalBody = document.getElementById(`modal-body`)
let modalTitle = document.getElementById("modal-title")
let scoreBody = document.getElementById('score-body')
let saveBtn = document.getElementById("save-score-btn")

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

// get random tidbit displayed
async function getTidbit(tid) {
    document.getElementById("tidbit-input").value = ''
    function getRandom(min, max){
        return min + Math.floor(Math.random()*(max-min + 1));
    }
    let random = getRandom(1,10)          // 0 resolves in 404 error - fixed
    // console.log(random)                                     // works

    await fetch(`${baseUrl}/${random}`, {
        method: "GET",
        headers: headers
    })
        .then(response => response.json())
        .then(data => createTidbit(data))        // console.log(data) is an object, body is the appropriate string
        .catch(err => console.error(err))
}

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

let score = 0;

const compareText = (e) => {
    e.preventDefault();
    let displayed = document.getElementById("tidbit").innerHTML
    let attempt = document.getElementById("tidbit-input").value

    if (displayed == attempt){
        modalTitle.innerText = 'Nice work! 100 points for each correct answer!';
        score += 100;
    } else {
        modalTitle.innerText = '*womp-womp* You lost 50 points';
        score -= 50;
    }

    modalBody.innerText = ''
    modalBody.innerText = `Score: ${score}`;

    showScore();
}

const showScore = () =>{
    scoreBody.innerText = ''
    scoreBody.innerText = `Score: ${score}`;
}

const saveScore = () => {
    console.log("Score Saved!")
}

const addTidbit = () => {
    console.log("Create Tidbit hit")
}


tidbitBtn.addEventListener("click", getTidbit)
compareBtn.addEventListener("click", compareText)
closeModal.addEventListener("click", getTidbit)
createBtn.addEventListener("click", addTidbit)
saveBtn.addEventListener("click", saveScore)



// compare functionality
// two nested for loops
// if/else nested css trigger to green, else trigger red












// saved code to display all cards "user tidbits"
// array.forEach(obj => {
//     let tidbitCard = document.createElement("div")
//     tidbitCard.classList.add("m-2")
//     tidbitCard.innerHTML = `
//             <div class="card d-flex" style="width: 18rem; height: 18rem;">
//                 <div class="card-body d-flex flex-column justify-content-between" style="height: available">
//                     <p class="card-text">${obj.body}</p>
//                     <div class="d-flex justify-content-between">
//                     </div>
//                 </div>
//             </div>
//         `