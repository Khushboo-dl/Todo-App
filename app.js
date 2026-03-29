document.addEventListener('DOMContentLoaded', () => {
  const savedTasks = localStorage.getItem('tasks');
  if (savedTasks) {
    tasks = JSON.parse(savedTasks);
    updateTasklist();
    updatestats();
  }
});
let tasks=[];

const savetasks = () => {
  localStorage.setItem('tasks',JSON.stringify(tasks));
}
 
const todoInput= document.querySelector('#todo_input');
const todoList= document.querySelector('.todo_list');

document.querySelector('#add_button')
.addEventListener('click', function(event) {
  console.log('jdnks')
  event.preventDefault();
  addtask();
});

const addtask = () => {
  const text=todoInput.value.trim();
  if(text){
  tasks.push({text:text, completed:false});
  todoInput.value='';
  updateTasklist();
  updatestats();
  savetasks();
  }
};


const updateTasklist=()=>{
todoList.innerHTML=''

tasks.forEach(
  (task,index) => {
    const listitem=document.createElement('li');
    listitem.innerHTML=
    ` <div class="taskItem">

       <div class="task ${task.completed ? "completed" : "" }">

        <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}/>
        <p> ${task.text}</p>

       </div>

      <div class="icons">

       <img src="WhatsApp Image 2026-01-13 at 8.41.52 PM.jpeg " onclick="editTask(${index})" />

       <img src="del.jpeg " onclick="deleteTask(${index})" />

      </div>
    </div> `;

    const checkbox = listitem.querySelector('.checkbox');
    checkbox.addEventListener('change', () => toggleTask(index));

    todoList.appendChild(listitem);
  }
)
}

const toggleTask=(index)=>{
  tasks[index].completed = !tasks[index].completed;
  updateTasklist();
  updatestats(true);
  savetasks();
}

const deleteTask=(index)=>{
  tasks.splice(index,1);
  updateTasklist();
  updatestats();
  savetasks();
};

const editTask=(index)=>{
 
 todoInput.value=tasks[index].text;
 tasks.splice(index,1);
 updateTasklist();
 todoInput.focus();
 updatestats();
 
};

const updatestats=(allowConfetti = false)=>{
  const total=tasks.length;
  const completed=tasks.filter(task=>task.completed).length;
  document.querySelector('#stats').innerText=`${completed} / ${total} `;
  const progress=(total===0)?0:(completed/total)*100;
  document.querySelector('#progress').style.width=`${progress}%`;

  if (allowConfetti && completed === total && total > 0) {
    myConfetti();
  }
}

const myConfetti = () => {
  const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}



  
