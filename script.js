$(document).ready(function () {
  var today = new Date();

  function getUnits() {
    let units = [];
    $(".unit").each(function () {
      let currentVal = $(this).val() || 0;
      units.push(currentVal);
    });
    console.log(`Units: ${units}`);
    return units;
  }

  const getSumOfUnits = function () {
    const units = getUnits();
    let sumOfUnits = 0;
    units.forEach((unit) => {
      sumOfUnits += parseFloat(unit);
    });
    console.log(`Sum of Units: ${sumOfUnits}`);
    return sumOfUnits;
  };

  function getPoints() {
    const grade = {
      A: 4.0,
      AB: 3.5,
      B: 3.25,
      BC: 3.0,
      C: 2.75,
      CD: 2.5,
      D: 2.25,
      E: 2.0,
      F: 0,
    };
    let points = [];
    $(".score").each(function () {
      let currentVal = $(this).val() || 0;
      currentVal >= 75 && currentVal <= 100
        ? points.push(grade["A"])
        : currentVal >= 70 && currentVal <= 75
        ? points.push(grade["AB"])
        : currentVal >= 65 && currentVal <= 69
        ? points.push(grade["B"])
        : currentVal >= 60 && currentVal <= 64
        ? points.push(grade["BC"])
        : currentVal >= 55 && currentVal <= 59
        ? points.push(grade["C"])
        : currentVal >= 50 && currentVal <= 54
        ? points.push(grade["CD"])
        : currentVal >= 45 && currentVal <= 49
        ? points.push(grade["D"])
        : currentVal >= 40 && currentVal <= 44
        ? points.push(grade["E"])
        : points.push(grade["F"]);
    });
    console.log(`Points: ${points}`);
    return points;
  }

  function calculateSingleCoursePoints() {
    const points = getPoints();
    const units = getUnits();

    let singleCoursePoints = [];
    //Todo create an object

    Object.keys(points).forEach((element) => {
      let singleCoursePoint = parseFloat(points[element] * units[element]);
      singleCoursePoints.push(singleCoursePoint);
    });
    console.log(`Single Course: ${singleCoursePoints}`);
    return singleCoursePoints;
  }

  function calculateSumOfSingleCoursePoints() {
    const singleCoursePoints = calculateSingleCoursePoints();
    let sumOfSingleCoursePoints = 0;
    Object.keys(singleCoursePoints).forEach((element) => {
      sumOfSingleCoursePoints =
        sumOfSingleCoursePoints + singleCoursePoints[element];
    });
    console.log(`Sum of Single Course ${sumOfSingleCoursePoints}`);
    return sumOfSingleCoursePoints;
  }

  function calculateCGPA() {
    const totalNumberOfPoints = calculateSumOfSingleCoursePoints();
    const totalNumberOfUnits = getSumOfUnits();
    const result = parseFloat(totalNumberOfPoints / totalNumberOfUnits) || 0.0;
    const cgp = result.toFixed(2);
    console.log(cgp);

    return cgp;
  }

  $(".btn-gpa").on("click", function () {
    var today = new Date();
    // const starttime =
    //  today.getSeconds();
    $('.totalunit').html(getSumOfUnits());
    $(".gpa").html(calculateCGPA());
    // const Finaltime =
    //   today.getSeconds();
    const exection = new Date() - today;
    console.log(exection);
  });

  $(".score").keydown(function (e) {
    if (
      !(
        (e.keyCode > 95 && e.keyCode < 106) ||
        (e.keyCode > 47 && e.keyCode < 58) ||
        e.keyCode == 8
      )
    ) {
      return false;
    }
  });
  $(".unit").keydown(function (e) {
    if (
      !(
        (e.keyCode > 95 && e.keyCode < 106) ||
        (e.keyCode > 47 && e.keyCode < 58) ||
        e.keyCode == 8
      )
    ) {
      return false;
    }
  });
  let counter = 1;
  function creaetNewrow() {
    let html = `
    <div class = "row" id="row_${counter}">
     <div class="form-group col-md-4">
         <input type="text" class="form-control title" id="title" placeholder="Title">
     </div>
     <div class="form-group col-md-3">

         <input type="number" class="form-control unit" id="unit" placeholder="Unit" min="0">
     </div>
     <div class="form-group col-md-3">
         <input type="number" class="form-control score" id="score" placeholder="Score" min="0">
     </div>
     <div class="form-group col-2">
         <button type="button" id = "delete_${counter}" class=" btn-del form-control btn btn-danger remove">delete</button>
     </div>
     </div>`;
    counter++;
    $(".course-row").append(html);
    // console.log(htmlList);
  }

  function removeRow() {
    var id = this.id;
    var split_id = id.split("_");
    var deleteindex = split_id[1];
    $("#row_" + deleteindex).remove();
    counter--;
    counter++;
  }
  $(".all").on("click", ".remove", removeRow);
  $(".new_course").on("click", creaetNewrow);

  $('#form')[0].reset();

});
