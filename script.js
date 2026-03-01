const btnAdd = document.getElementById("btnAdd")
const btnClear = document.getElementById("cleanList")
const inputText = document.getElementById("inputText")
const ul = document.getElementById("ul")
const count = document.getElementById("count")


btnAdd.addEventListener("click", add)

function add(){

    if(inputText.value === "") return
    
    createItem(inputText.value)

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
        
        numberCount()
    })

    return removeBtn
}

function createCheckbox(text){
    const checkBox = document.createElement("input")
    checkBox.type = "checkbox"

    checkBox.addEventListener("change", () => {
        text.classList.toggle("risc") 
        
    })

    return checkBox
}

function cleanList(){  

    btnClear.addEventListener("click", () => {
        count.textContent = `Tarefas: 0 `
        ul.textContent = ""
        
        
    })
    
}

enterPress()

cleanList()



