let genders = document.querySelectorAll("[data-gender]"); // кнопки пола
let age = document.querySelector(".input-age"); //кнопки параметров
let weight = document.querySelector(".input-weight"); //кнопки параметров
let height = document.querySelector(".input-height"); //кнопки параметров
let activities = document.querySelectorAll("[data-activity]"); // кнопки активности

let userList;

render();

// обработчик событий для кнопок пола
genders.forEach(function (item){
    item.addEventListener("click", function (e){
        let target = e.target;
        user.sex = target.getAttribute("data-gender");
    })
})


// обработчик событий кнопок параметров
age.addEventListener("change", function (){
    let a = correctInput(this.value);
    if(a)  user.age = this.value;
    else  user.age = 24;
})

weight.addEventListener("change", function (){
    if(correctInput(this.value)) user.weight = this.value;
    else user.weight = 83;
})

height.addEventListener("change", function (){
    if(correctInput(this.value)) user.height = this.value;
    else user.height = 173;
})

// проверяет, правильно ли ввели значение
function correctInput(input){
    if(parseInt(input) <= 0){
        return false;
    }
    return true;
}


// обработчик событий кнопок активности
activities.forEach(function (item){
    item.addEventListener("click", function (){
        if(item.checked){
            user.activity = item.getAttribute("data-activity");
        }
    })
})


//логика рассчета калорий
let calculate = document.querySelector(".calculate");
calculate.addEventListener("click", function (){
    // на этом этапе вызывется метод
    calculateCalorie();
})

//метод, рассчитывающий калории
function calculateCalorie(){
    //вызывается функция, которая переводит поля у user в нужный тип
    user.translate();
    let countWeight = ((10 * user.weight) + (6.25 * user.height) - (5 * user.age) + user.sex) * user.activity;
    countWeight = countWeight.toFixed(0);
    countWeight = parseInt(countWeight);

    let throwWeight = document.querySelector("#throwWeight");
    throwWeight.innerText = countWeight + " ккал";
    let supportWeight = document.querySelector("#supportWeight");
    supportWeight.innerText = (200 + countWeight) + " ккал";
    let enlargeWeight = document.querySelector("#enlargeWeight");
    enlargeWeight.innerText = (400 + countWeight) + " ккал";

    //измененные данные сразу заносятся в localSorage
    localStorage.setItem("key", JSON.stringify(user));
}


//при нажатии на кнопку "очистить поля" необходимо удалить данные из localStorage
let reset = document.querySelector(".reset");
reset.addEventListener("click", function (){
    localStorage.removeItem("key");
    user.sex = 5;
    user.age = 24;
    user.height = 173;
    user.weight = 83;
    user.activity = 1.2;

    render();
})

function render(){
    userList = localStorage.getItem("key");
    userList = JSON.parse(userList);

    if(userList !== null){
        genders.forEach(function (item){
            let attribute = item.getAttribute("data-gender");
            if(attribute == userList.sex){
                item.checked = 'true';
                user.sex = attribute;
            }
        });
        age.value = userList.age;
        user.age = userList.age;
        weight.value = userList.weight;
        user.weight = userList.weight;
        height.value = userList.height;
        user.height = userList.height;

        activities.forEach(function (item){
            if(item.getAttribute("data-activity") == userList.activity){
                item.checked = 'true';
                user.activity = userList.activity;
            }
        });
        calculateCalorie();
    } else{
        genders.forEach(function (item){
            let attribute = item.getAttribute("data-gender");
            if(attribute == user.sex){
                item.checked = 'true';
            }
        });
        age.value = "";
        weight.value = "";
        height.value = "";

        activities.forEach(function (item){
            if(item.getAttribute("data-activity") == user.activity){
                item.checked = 'true';
            }
        });
    }
}

