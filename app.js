  let currentTee = 0
  let currentCourse = 18300
  let playerCount = 0
  let players = []
//   const selectCourse = getElementById('#course-select')

  class Player {
      constructor(name, scores = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]) {
          this.name = name;
          this.id = Util.newGuid('player');
          this.scores = scores;
      }
  }

  // Selecting a course

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
        currentCourse = e.target.value
        // console.log(currentCourse)
        getCourseInfo(printTees)
    })


// Changing in the Tee

  function getCourseInfo(cb) {
      fetch(`https://golf-courses-api.herokuapp.com/courses/${currentCourse}`)
          .then(response => response.json())
          .then(data => cb(data.data.holes[0].teeBoxes));
  }

  function printTees(teeBoxes) {
    console.log(teeBoxes)
    let teeBoxSelectHtml = ''
    teeBoxes.forEach((teeBox, index) => {
    teeBoxSelectHtml += `<option value="${index}">${teeBox.teeType.toUpperCase()} </option>` // could potentially include ${teeBox.yards} yards
    })
    document.getElementById('tee-box-select').innerHTML = teeBoxSelectHtml;
  }

  document.getElementById('tee-box-select').addEventListener('change', (e) => {
    currentCourse = e.target.value
    // console.log(currentCourse)

})

getCourseInfo(printTees)


//   getCourseInfo(render)
//   function changeTeeBox(box) {
//       currentTee = box
//       getCourseInfo(render)
//   }

  function changeCourse(courseID) {
      currentCourse = courseID
      getCourseInfo(render)
  }

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

