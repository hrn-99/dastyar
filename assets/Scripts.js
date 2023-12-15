// select dom elements

const hour = document.querySelector("#hour");
const date = document.querySelector("#Date");
const datemiladi = document.querySelector("#Datemiladi");
const current = document.querySelector("#current");
const customDescription = document.querySelector("#customDescription");
const weatherMaxMin = document.querySelector("#weather-maxMin");
const DateIslamicHijri = document.querySelector("#Date-islamicHijri");
// --------todo
const formTask = document.querySelector("#form-task");
const taskInput = document.getElementById("input");
const toDoSelector = document.querySelector("#todo-task");
const app = document.querySelector("#main-app");

//------------------------------------------------weather and time

const fetchTime = async () => {
  const res = await fetch(
    `https://kaaryar0506reactblog.liara.run/current/time`
  );
  const data = await res.json();
  //const clock = ((data.current) /3600000)%24;

  const saeat = new Date(data.current);
  const timeHour = saeat.getHours();
  const timeMinutes = saeat.getMinutes();
  const timeDate = data.shamsi.dayInMonth;
  const timeMonth = data.shamsi.month;
  const miladiMonth = data.miladi.month;
  const miladiDay = data.miladi.dayInMonth;
  hour.innerHTML = `${timeHour}:${timeMinutes}`;
  date.innerHTML = `${timeDate}${timeMonth}`;
  datemiladi.innerHTML = `${data.miladi.year}/${miladiMonth}/${miladiDay}`;
  DateIslamicHijri.innerHTML = `${data.islamicHijri.year}/${data.islamicHijri.month}/${data.islamicHijri.dayInMonth}`;
};
// --------------------------------------------- اب و هوا
const fetchWeather = async () => {
  const res = await fetch(
    `https://api.dastyar.io/express/weather?lat=35.67194277&lng=51.42434403&lang=fa&theme=light`
  );
  const data = await res.json();

  current.innerHTML = `${data[0].current}°`;
  current.style.background = `${data[0].backgroundColor}`;
  customDescription.innerHTML = `${data[0].customDescription.emoji}  ${data[0].customDescription.text}`;
  weatherMaxMin.innerHTML = `${data[0].min}° حداکثر °${data[0].max}- حداقل`;
};

//    ----------------------------------------- todo   list
formTask.addEventListener("submit", function(e) {
  e.preventDefault();
  console.log(taskInput.value);
  if (taskInput.value.trim()) {
    const data = localStorage.getItem("tasks");
    const Tasks = [];
    if (data !== null) {
      const Tasks = JSON.parse(data);

      Tasks.push(taskInput.value);

      console.log(data);
      localStorage.setItem("tasks", JSON.stringify(Tasks));
    } else {
      Tasks.push(taskInput.value);
      localStorage.setItem("tasks", JSON.stringify(Tasks));
      // const data= localStorage.getItem("tasks");
    }
    // const tasks[i] =  push(taskInput.value);

    // creatTask(data);
  } else {
    alert("فیلد نباید خالی باشد !");
  }
  todoShow();
  taskInput.value = "";
});
//
const creatTask = async Tasks => {
  console.log(JSON.stringify(Tasks));

  // const tasks =
};

// show tasks
const todoShow = async () => {
  const data = localStorage.getItem("tasks");
  console.log(data);
  if (data !== null) {
    const aryTask = JSON.parse(data);
    console.log(aryTask);
    var i = aryTask.length - 1;
    console.log(i);
    toDoSelector.innerHTML = ``;
    for (i; i >= 0; i--) {
      console.log(i);
      toDoSelector.innerHTML += `<li class="task" id="${i}">
                                <span class="edit-trash">
                                    <i class='bx bxs-trash delete-task' style='color:#6f6969'></i>
                                    <i class='bx bx-edit-alt' style='color:#6f6969'></i>
                                </span>
                                <span>
                                        <span class="task-txt">
                                          ${aryTask[i]}
                                            </span>
                                            <span>
                                                    <input type="checkbox" class="task-checkBox">
                                            </span>
                                </span>
                                </li>  `;
    }
  }
};
// delete task
app.addEventListener("click", function(e) {
  const id = e.target.parentElement.parentElement.id;
  console.log(id);
  //

  // delete task for todo
  if (e.target.classList.contains("delete-task")) {
    const deleteConfirmation = confirm("پاکش کنم  ?");
    if (deleteConfirmation) {
      const data = localStorage.getItem("tasks");

      const Tasks = JSON.parse(data);
      Tasks.splice(id, 1);
      console.log(data);
      localStorage.setItem("tasks", JSON.stringify(Tasks));
    }
    todoShow();
  }
});

setInterval(function() {
  fetchTime();
}, 30000);

fetchTime();
fetchWeather();
todoShow();
