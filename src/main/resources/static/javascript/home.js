const tidbitBtn = document.getElementById("get-tidbit")
const tidbitContainer = document.getElementById("tidbit-container")

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
    function getRandom(min, max){
        return min + Math.floor(Math.random()*(max-min + 1));
    }
    let random = getRandom(1,10)          // 0 resolves in 404 error - fixed
    console.log(random)                                     // works


    await fetch(`${baseUrl}/${random}`, {
        method: "GET",
        headers: headers
    })
        .then(response => response.json())
        .then(data => createTidbit(data))        // console.log(data) is an object, body is the appropriate string
        .catch(err => console.error(err))
}

const createTidbit = (array) => {
    console.log(array.body)    // targeted
    tidbitContainer.innerHTML = ''
        let tidbitCard = document.createElement("div")
        tidbitCard.classList.add("m-2")
        tidbitCard.innerHTML = `
            <div class="card d-flex" style="width: 18rem; height: 18rem;">
                <div class="card-body d-flex flex-column justify-content-between" style="height: available">
                    <p class="card-text" style="color: #000000">${array.body}</p>
                    <div class="d-flex justify-content-between">
                    </div>
                </div>
            </div>
        `
        tidbitContainer.append(tidbitCard);
}


tidbitBtn.addEventListener("click", getTidbit)













// saved code
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