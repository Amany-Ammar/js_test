////////////////////loading screen///////////
$(document).ready(function(){
    $('#loading-icon').fadeOut(500,function(){
        $('#loading').slideUp(1000)
        $('body').css('overflow','visible')
    })
})


////////////////////  navv  //////////////
let boxWidth = $('.hidden-menu').outerWidth();
$('#openAside').click(function(){
    if($('.hidden-menu').css('left') == '0px'){
        $('.hidden-menu').animate({left:`-${boxWidth}px`},500)
        $('.main-nav').animate({left:`0px`},500)
        // $('.close').classList.add('d-none')
        // $('.open').classList.remove('d-none')
    }
    else{
        $('.hidden-menu').animate({left:`0px`},500)
        $('.main-nav').animate({left:`${boxWidth}px`},500)
        // $('.close').classList.remove('d-none')
        // $('.open').classList.add('d-none')
    }
})
$('.hidden-menu').css('left',`-${boxWidth}px`)



///////////////////main page///////////////////
let row = $('#rowData')
async function getMeals() {
    const api = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=')
    const response = await api.json()
    // console.log(response);
    displayMeals(response.meals) 
}

getMeals()
function displayMeals(res) {
    console.log(res)
    for(var i = 0; i < res.length; i++){
        row.append(`<div class="col-xl-3 col-lg-4 col-md-6">
        <div onclick="filterCategory('${res[i].idMeal}')" class="image w-100 position-relative overflow-hidden">
            <img src="${res[i].strMealThumb}" alt="" class="w-100 rounded-2">
            <div class="image-overlay w-100 h-100 position-absolute top-100 rounded-2 d-flex align-items-center px-3">
                <h2>${res[i].strMeal}</h2>
            </div>
        </div>
    </div>`)
    } 
}



/////////////////// search ///////////////////
function getSearch() {
    catRow.innerHTML = ""
    catRow.innerHTML = `<form action="" class="search d-flex gap-3">
    <div class="col-lg-6 col-md-12">
        <input oninput="searchName(this.value) type="text" class="form-control" placeholder="Search By Name">
    </div>
    <div class="col-lg-6 col-md-12">
        <input oninput="searchFirstLetter(this.value) type="text" class="form-control" placeholder="Search By First Letter">
    </div>
</form>`

    } 

      async function searchName(srarchName) {
        row.innerHTML = "";
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${srarchName}`);
        response = await response.json();
        response.meals ? displayMeals(response.meals) : displayMeals([]);
      }
      
      async function searchFirstLetter(srarchName) {
        row.innerHTML = "";
        srarchName == "" ? (srarchName = "a") : "z";
        let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${srarchName}`);
        response = await response.json();
        response.meals ? displayMeals(response.meals) : displayMeals([]);
      }


///////////////////categories///////////////////
let catRow= document.getElementById("rowData");
async function getCategories() {
    let response = await fetch('https://www.themealdb.com/api/json/v1/1/categories.php')
    response = await response.json()
    // console.log(response);
    displayCategories(response.categories)
}

function displayCategories(res) {
    let cartoona = "";
    for (let i = 0; i < res.length; i++) {
        cartoona += `<div class="col-xl-3 col-lg-4 col-md-6">
        <div class="image w-100 position-relative overflow-hidden" onclick="filterCategory('${res[i].strCategory}')">
            <img src="${res[i].strCategoryThumb}" alt="" class="w-100 rounded-2">
            <div class="image-overlay w-100 h-100 position-absolute top-100 rounded-2 d-flex flex-column align-items-center text-center px-3">
                <h2>${res[i].strCategory}</h2>
                <p>${res[i].strCategoryDescription}</p>
            </div>
        </div>
    </div>`
    }
    catRow.innerHTML = cartoona
}


async function filterCategory(category){
    catRow.innerHTML = ''
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await response.json()
    displayMeals(response.meals)
}


///////////////////  Area  ///////////////////
async function getArea() {
    catRow.innerHTML = ""
    let respone = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?a=list')
    respone = await respone.json()
    // console.log(respone.meals);
    displayArea(respone.meals)
}

function displayArea(arr) {
    let cartoona = "";
    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3 mb-3">
                <div onclick="filterArea('${arr[i].strArea}')" class="rounded-2 text-center text-light cursor-pointer">
                    <i class="fa-solid fa-house-laptop fa-4x"></i>
                    <h3>${arr[i].strArea}</h3>
                </div>
        </div> `
    }
    catRow.innerHTML = cartoona
}


async function filterArea(area){
    catRow.innerHTML = ''
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=${area}`)
    response = await response.json()
    console.log(response.meals)
    displayMeals(response.meals)
}


///////////////////  ingredients  ///////////////////
async function getIngredients(){
    catRow.innerHTML = ""
    let respone = await fetch('https://www.themealdb.com/api/json/v1/1/list.php?i=list')
    respone = await respone.json()
    // console.log(respone.meals);
    displayIngredients(respone.meals.slice(0, 20))
}

function displayIngredients(arr) {
    let cartoona = "";
    for (let i = 0; i < arr.length; i++) {
        cartoona += `
        <div class="col-md-3">
                <div onclick="filteringredient('${arr[i].strIngredient}')" class="text-center cursor-pointer text-light">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
                </div>
        </div> `
    }
    catRow.innerHTML = cartoona
}


async function filterIngredient(ingredient){
    catRow.innerHTML = ''
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=${ingredient}`)
    response = await response.json()
    displayMeals(response.meals)
}


///////////////////  contact Us  ///////////////////
function contactForm() {
    catRow.innerHTML = ""
    catRow.innerHTML = `<div class="d-flex justify-content-center align-items-center min-vh-100">
    <form action="" class="w-50">
        <div class="d-flex gap-3 mb-3">
            <div class="w-50">
                <input oninput="validation(this)" type="text" id="userName" class="form-control" placeholder="Enter Your Name">
                <div class="alert alert-danger mt-2 d-none">Speciaal characters and numbers not allowed</div>
            </div>
            <div class="w-50">
                <input oninput="validation(this)" type="email" id="Email" class="form-control" placeholder="Enter Your Email">
                <div class="alert alert-danger mt-2 d-none">Email not valid *exemple@yyy.zzz</div>
            </div>
        </div>
        <div class="d-flex gap-3 mb-3">
            <div class="w-50">
                <input oninput="validation(this)" type="tel" id="Phone" class="form-control" placeholder="Enter Your Phone">
                <div class="alert alert-danger mt-2 d-none">Enter valid Phone Number</div>
            </div>
            <div class="w-50">
                <input oninput="validation(this)" type="number" id="Age" class="form-control" placeholder="Enter Your Age">
                <div class="alert alert-danger mt-2 d-none">Enter valid Age</div>
            </div>
        </div>
        <div class="d-flex gap-3">
            <div class="w-50">
                <input oninput="validation(this)" type="password" id="Password" class="form-control" placeholder="Enter Your Password">
                <div class="alert alert-danger mt-2 d-none">Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="w-50">
                <input oninput="validation(this)" type="password" id="RePassword" class="form-control" placeholder="Repassword">
                <div class="alert alert-danger mt-2 d-none">Enter valid Password</div>
            </div>
        </div>
        <div class="text-center">
            <button type="button" disabled class="btn btn-outline-danger mt-4" id="submitBtn"> submit</button>
        </div>
    </form>
</div>`
    console.log('form')
    } 



///////////////// validation ////////////////////
let userName = document.getElementById('userName')
let Email = document.getElementById('Email')
let Phone = document.getElementById('Phone')
let Age = document.getElementById('Age')
let Password = document.getElementById('Password')
let Repassword = document.getElementById('Repassword')
let submitBtn = document.getElementById('submitBtn')
function validation(inp) {
    var Regex = {
        userName : /^[\w]{3,}$/,
        Email : /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,6}$/,
        Phone : /^01[0-2]\d{1,8}$/,
        Password : /^[\w]{5,}$/,
        Repassword : /^[\w]{5,}$/
    }
    if(Regex[inp.id].test(inp.value)){
        inp.nextElementSibling.classList.replace('d-block','d-none')
        return true
    }
    else{
        inp.nextElementSibling.classList.replace('d-none','d-block')
        return false
    }
}

submitBtn.addEventListener('click',function(e){
    e.preventDefault()
    if(validation(userName) && validation(Email) && validation(Password) && validation(Repasswordassword)){
        submitBtn.removeAttribute("disabled")
    }
    else{
        submitBtn.setAttribute("disabled")
    }
})





////////////instructions /////////////////
async function getMealinstructions(meal) {
    row.innerHTML = "";
    let respone = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal}`)
    respone = await respone.json();
    displayMealinstructions(respone.meals[0]);
    // console.log(respone);
  }
  function displayMealinstructions(meal) {
    let cartona = "";
    for (let i = 0; i < meal.length; i++) {
      cartona += `
      <div class="col-md-3">
                  <img class="w-100 rounded-2" src="${meal[i].strMealThumb}"
                      alt="...">
                      <h2>${meal[i].strMeal}</h2>
              </div>
  
              <div class="col-md-9">
                  <h2>Instructions</h2>
                  <h3 class="h6"> ${meal[i].strInstructions}</h3>
                  <h3><span >Area : </span>${meal[i].strArea}</h3>
                  <h3><span >Category : </span>${meal[i].strCategory}</h3>
                  <h3>Recipes :</h3>
                  <ul class="list-unstyled d-flex g-3 flex-wrap">
                      ${ingredients}
                  </ul>
  
                  <h3>Tags :</h3>
                  <ul class="list-unstyled d-flex g-3 flex-wrap">
                      ${tagsStr}
                  </ul>
  
                  <a href="${meal[i].strSource}" class="btn btn-info">Source</a>
                  <a href="${meal[i].strYoutube}" class="btn btn-danger">Youtube</a>
              </div>`;
    }
    row.innerHTML = cartona;
  }