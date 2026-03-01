const btnAdd = document.getElementById("btnAdd")
const btnClear = document.getElementById("cleanList")
const inputText = document.getElementById("inputText")
const ul = document.getElementById("ul")
const count = document.getElementById("count")


btnAdd.addEventListener("click", add)

function add(){

    if(inputText.value === "") return
    
    createItem(inputText.value)

    saveItems()

    numberCount()

    inputText.value = ""
}

function enterPress(){
    document.addEventListener("keydown", (e) => {
        if(e.key === "Enter"){
            btnAdd.click()
        }
    })
}

let numberCount = function(){
    
   count.textContent = `Tarefas: ${ul.children.length} `
   
}

function createItem(text, concluido = false){

    const li = document.createElement("li") 
    li.classList.add("items")

    const removeBtn = createBtnRemove(li)
    

    const texto = document.createElement("span")
    texto.textContent = text

    const checkBox = createCheckbox(texto)
    checkBox.checked = concluido
    
    if(concluido){
        texto.classList.toggle("risc") 
    }

    li.appendChild(checkBox)
    li.appendChild(texto)
    li.appendChild(removeBtn)
    ul.append(li)
}

function createBtnRemove(item){
    
    const removeBtn = document.createElement("button")
    removeBtn.textContent = "remover"

    removeBtn.addEventListener("click", () => {
             
        item.remove()
        inputText.value = ""
        saveItems()
        numberCount()
    })

    return removeBtn
}

function saveItems(){
    const items = []

    document.querySelectorAll("#ul li span").forEach(item => {

        const checkbox = item.closest('li').querySelector('input[type="checkbox"]');

        items.push({
            texto: item.textContent,
            concluido: checkbox.checked,
            
        })

       })
    
    

    localStorage.setItem("tarefas", JSON.stringify(items))   
    
}

function getItems(){

    const tarefas = JSON.parse(localStorage.getItem("tarefas")) || []

    tarefas.forEach(item => {
        createItem(item.texto, item.concluido)
    });

    count.textContent = tarefas.length
    numberCount()
}

function createCheckbox(text){
    const checkBox = document.createElement("input")
    checkBox.type = "checkbox"

    checkBox.addEventListener("change", () => {
        text.classList.toggle("risc") 
        saveItems()
    })

    return checkBox
}

function cleanList(){  

    btnClear.addEventListener("click", () => {
        count.textContent = `Tarefas: 0 `
        ul.textContent = ""
        localStorage.removeItem("tarefas")
        
    })
    
}

enterPress()

cleanList()

getItems()

