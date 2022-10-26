  let currentTee = 0
  let currentCourse = 18300
  let playerCount = 0
  let players = []


  let yards = []
  let par = []
  let handicap = []


  const yardsOne = document.getElementById("yardsOne");
  const parOne = document.getElementById("parOne");
  const handicapOne = document.getElementById("handicapOne");

  const yardsTwo = document.getElementById("yardsTwo");
  const parTwo = document.getElementById("parTwo");
  const handicapTwo = document.getElementById("handicapTwo");

  const playerForm = document.getElementById("playerForm")
  const playerName = document.getElementById('playerName')
  const cardOne = document.getElementById('cardOne')
  const cardTwo = document.getElementById('cardTwo')



  class Player {
      constructor(name, scores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) {
          this.name = name;
          this.id = Util.newGuid('player');
          this.scores = scores;
      }
  }

  // CHANGING THE COURSE

  function getAvailableCourses(cb) {
      fetch('https://golf-courses-api.herokuapp.com/courses/')
          .then(response => response.json())
          .then(data => cb(data.courses))
  }

  function printCourses(courses) {
    let courseOptionsHtml = '';
    courses.forEach((course) => {
    courseOptionsHtml += `<option value="${course.id}">${course.name}</option>`;
    });
    document.getElementById('course-select').innerHTML = courseOptionsHtml;

}

getAvailableCourses(printCourses) 

    document.getElementById('course-select').addEventListener('change', (e) => {
        e.preventDefault();
        currentCourse = e.target.value
        // console.log(currentCourse)
        getCourseTeeBoxes(printTees)
    })


// CHANGING THE TEES

  function getCourseTeeBoxes(cb) {
    fetch(`https://golf-courses-api.herokuapp.com/courses/${currentCourse}`)
        .then(response => response.json())
        .then(data => cb(data.data.holes[0].teeBoxes));
  }

  function printTees(teeBoxes) {
    let teeBoxSelectHtml = ''
    teeBoxes.forEach((teeBox, index) => {
    teeBoxSelectHtml += `<option value="${teeBox.teeTypeId}">${teeBox.teeType.toUpperCase()} </option>` // could potentially include ${teeBox.yards} yards
    currentTee = teeBox.teeTypeId
    })
    document.getElementById('tee-box-select').innerHTML = teeBoxSelectHtml;
  }

  // Here we are printing the default Tee we're going to call this again later
getCourseTeeBoxes(printTees)


  document.getElementById('tee-box-select').addEventListener('change', (e) => {
    e.preventDefault();
    let teeToBeParsed = e.target.value
    let parsedTee = parseInt(teeToBeParsed)
    currentTee = parsedTee
    yards = []
    par = []
    handicap = []
    getCourseInfo(printCourseInfo)
    //console.log(currentTee)
})


// GETTING THE COURSE INFORMATION YARDS, PAR, HANDICAP

function getCourseInfo(cb) {
    fetch (`https://golf-courses-api.herokuapp.com/courses/${currentCourse}`)
    .then(response => response.json())
    .then(data => cb(data.data.holes));
}
 
function printCourseInfo(holes) {
    holes.forEach((index) => {
        index.teeBoxes.forEach((box) => {
        if (box.teeTypeId === currentTee) {
            yards.push(box.yards)
            par.push(box.par)
            handicap.push(box.hcp)
            render()
            }
        })
    })
}

getCourseInfo(printCourseInfo)


// THESE FUNCTIONS PRINT THE COURSE INFORMATION

function printYards() {
    clearElement(yardsOne)
    clearElement(yardsTwo)

    const yardsOneHeader = document.createElement('th')
    yardsOneHeader.innerText = 'Yard'
    yardsOne.appendChild(yardsOneHeader)

    const yardsTwoHeader = document.createElement('th')
    yardsTwoHeader.innerText = 'Yard'
    yardsTwo.appendChild(yardsTwoHeader)

    let yardsOneSlice = yards.slice(0 , 9)
    let yardsTwoSlice = yards.slice(9)
    
    yardsOneSlice.forEach((item) => {
            let td = document.createElement("td");
            td.innerText = item;
            yardsOne.appendChild(td);
        })

        yardsTwoSlice.forEach((item) => {
            let td = document.createElement("td");
            td.innerText = item;
            yardsTwo.appendChild(td);
        })
}

function printPar() {
    clearElement(parOne)
    clearElement(parTwo)

    const parOneHeader = document.createElement('th')
    parOneHeader.innerText = 'Par'
    parOne.appendChild(parOneHeader)

    const parTwoHeader = document.createElement('th')
    parTwoHeader.innerText = 'Par'
    parTwo.appendChild(parTwoHeader)

    let parOneSlice = par.slice(0 , 9)
    let parTwoSlice = par.slice(9)
    
    parOneSlice.forEach((item) => {
            let td = document.createElement("td");
            td.innerText = item;
            parOne.appendChild(td);
        })

    parTwoSlice.forEach((item) => {
            let td = document.createElement("td");
            td.innerText = item;
            parTwo.appendChild(td);
        })
}


function printHandicap() {
    clearElement(handicapOne)
    clearElement(handicapTwo)

    const handicapOneHeader = document.createElement('th')
    handicapOneHeader.innerText = 'Handicap'
    handicapOne.appendChild(handicapOneHeader)

    const handicapTwoHeader = document.createElement('th')
    handicapTwoHeader.innerText = 'Handicap'
    handicapTwo.appendChild(handicapTwoHeader)

    let handicapOneSlice = handicap.slice(0 , 9)
    let handicapTwoSlice = handicap.slice(9)
    
    handicapOneSlice.forEach((item) => {
            let td = document.createElement("td");
            td.innerText = item;
            handicapOne.appendChild(td);
        })

    handicapTwoSlice.forEach((item) => {
            let td = document.createElement("td");
            td.innerText = item;
            handicapTwo.appendChild(td);
        })
}

function render() {
    printYards()
    printPar()
    printHandicap()
}

function clearElement(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild)
    }
}


//   getCourseInfo(render)
//   function changeTeeBox(box) {
//       currentTee = box
//       getCourseInfo(render)
//   }

//   function changeCourse(courseID) {
//       currentCourse = courseID
//       getCourseInfo(render)
//   }

//   function addPlayer(name) {
//       name = document.getElementById('playerName').value
//       if (name != "") {
//           playerCount += 1
//           players.push(new Player(name))
//           document.getElementById('playerName').value = ''
//           getCourseInfo(render)
//           //validatePlayerCount()
//       }
//   }

  playerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    // Here we are storing the value of the form after the user clicks the button
    const playerVal = playerName.value;
    // if the user leaves the form blank we return with nothing 
    // if filled out we will call the render function and push the HTML so it displays on the left column
    if (!playerVal) return
        playerCount += 1
        const player = addPlayer(playerVal)
        playerName.value = null
        players.push(player)
        console.log(playerCount)
        console.log(players)
        printPlayer()
    })


    function addPlayer (name) {
        return {id: Date.now().toString(), name: name, scores: [] }
     }


    function printPlayer () {
        players.forEach (player => {
            clearElement()
            const playerRow = document.createElement('tr')
            playerRow.dataset.playerId = player.id
            
            const playerHeading = document.createElement('th')
            playerHeading.innerHTML = `${player.name}`
            
            cardOne.appendChild(playerRow) 
            playerRow.appendChild(playerHeading)

        })
    }