const form= document.querySelector('.form')
const list= document.querySelector('.list')
const input= document.querySelector('.input')
const addButton= document.querySelector('.fa-plus')
//getting the information from local storage
//if there are prev task the for each task createTodList function is called so that even if the page get refreshed data is not lost
let tasks= JSON.parse(localStorage.getItem('list'))
if(tasks){
    tasks.forEach(task=>{
        createToDoList(task)
    })
}
form.addEventListener('submit', (event)=>{
    event.preventDefault() 
    createToDoList()   
})
addButton.addEventListener('click', () =>{
    if(input.value){
        createToDoList()
    }
    
})
function createToDoList(task){
    let newTask= input.value
    if(task){
        newTask= task.name
    }
    const listEl= document.createElement('li')
    if(task && task.checked){
        listEl.classList.add('checked')
    }
    listEl.innerText= newTask
    list.appendChild(listEl)
    input.value= ''
    //create the check and trash buttons and append to list element
    const checkButton= document.createElement('div')
    checkButton.innerHTML=`<i class="fa-solid fa-square-check">`
    listEl.appendChild(checkButton)
    const trashButton= document.createElement('div')
    trashButton.innerHTML= `<i class="fa-solid fa-trash">`
    listEl.appendChild(trashButton)
    checkButton.addEventListener('click', ()=>{
        listEl.classList.toggle('checked')
        updateLocalStorage()
    })
    trashButton.addEventListener('click', ()=>{
        listEl.remove()
        updateLocalStorage()
    })
    updateLocalStorage()
}
function updateLocalStorage(){
     tasks= []
    const listElements= document.querySelectorAll('li')
    listElements.forEach(task=>{
        tasks.push({
            name: task.innerText,
            checked: task.classList.contains('checked')
        })
        
    })
    localStorage.setItem('list', JSON.stringify(tasks))
    
}

