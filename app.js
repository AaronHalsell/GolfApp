  let currentTee = 0
  let currentCourse = 18300
  let playerCount = 0
  let players = []
  let yards = [];

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
    getCourseInfo(printCourseInfo)
    //console.log(currentTee)
})


// GETTING THE YARDS

function getCourseInfo(cb) {
    fetch (`https://golf-courses-api.herokuapp.com/courses/${currentCourse}`)
    .then(response => response.json())
    .then(data => cb(data.data.holes));
}
 
function printCourseInfo(holes) {
    holes.forEach((index) => {
        index.teeBoxes.forEach((box) => {
        //console.log(box.teeTypeId, "===", currentTee)
        if (box.teeTypeId === currentTee) {
            yards.push(box.yards)
            }
        })
    })
    console.log(yards)
}

getCourseInfo(printCourseInfo)
    
    // let yardsRow = document.getElementById("holes");

    // yards.forEach((item) => {
    //     let td = document.createElement("td");
    //     td.innerText = item;
    //     yardsRow.appendChild(td);
    // });










//   getCourseInfo(render)
//   function changeTeeBox(box) {
//       currentTee = box
//       getCourseInfo(render)
//   }

//   function changeCourse(courseID) {
//       currentCourse = courseID
//       getCourseInfo(render)
//   }

  function addPlayer(name) {
      name = document.getElementById('playerName').value
      if (name != "") {
          playerCount += 1
          players.push(new Player(name))
          document.getElementById('playerName').value = ''
          getCourseInfo(render)
          validatePlayerCount()
      }
  }

