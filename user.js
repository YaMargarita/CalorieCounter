// в начале у меня будет уже создан объект с заполненными по дефолту полями
let user = {
    sex: 5,
    age: 24,
    height: 173,
    weight: 83,
    activity: 1.2,

    translate(){
        this.sex = parseInt(this.sex);
        this.age = parseInt(this.age);
        this.height = parseInt(this.height);
        this.weight = parseInt(this.weight);
        this.activity = parseFloat(this.activity);
    }
};