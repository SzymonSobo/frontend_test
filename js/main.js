
let selectedValue;
    let postText;
    let x;
// Wczytywanie danych do LocalStorage przy pierwszym uruchomieniu
if (!localStorage.getItem('items')) {
    loadJSONToLocalStorage();
} else{
    x=JSON.parse(localStorage.getItem('items')).array.length-2;
}

    const firstBlockBtn = document.querySelectorAll('input[name="options"')
    const nameSurname = document.querySelector('.header__text__par')
    const thirdBlockText = document.querySelector('.main__boxes__box3__text')
    const secondBlockBtn1 = document.querySelector('.main__boxes__box2__btnBox__btn1')
    const secondBlockBtn2 = document.querySelector('.main__boxes__box2__btnBox__btn2')
    const footerBtn= document.querySelector('.footer__btn')
    const addBtn = document.querySelector('#addBtn')
    const deteleBtn = document.querySelector('#deleteBtn')
    const footerBtn1 = document.querySelector('#footer__optionsBox__btn1')
    const footerBtn2 = document.querySelector('#footer__optionsBox__btn2')
    
 

// ładowanie LocalStorage 

async function loadJSONToLocalStorage() {
    const response = await fetch('array.json');
    const data = await response.json();
    localStorage.setItem('items', JSON.stringify(data));
    x=JSON.parse(localStorage.getItem('items')).array.length-2;
}
//

// dodawanie elementów do localStorage 
function addItem() {
    const newParagraph = document.querySelector('#newParagraphDescription').value;
    const items = JSON.parse(localStorage.getItem('items')) || [];
    const newItem = newParagraph;
    items.array.push(newItem);
    localStorage.setItem('items', JSON.stringify(items));
    document.querySelector('#newParagraphDescription').value = ''
}

//
//Usuwanie elementów z LocalStorage
function deleteItem() {
    const deleteId = parseInt(document.querySelector('#deleteId').value);
    let items = JSON.parse(localStorage.getItem('items')) || [];
    items.array.splice(deleteId-1,1);
    localStorage.setItem('items', JSON.stringify(items));
    document.querySelector('#deleteId').value = ''
}
//

function checkValue(){
    const items = JSON.parse(localStorage.getItem('items')) || [];
    firstBlockBtn.forEach(btn => {
        if(btn.checked){
            selectedValue = btn.value;
        }
        if(selectedValue==='1'){
            postText = items.array[0];
            } else if(selectedValue==='2'){
                 postText = items.array[1];
                } else if(selectedValue==='3'){
                     postText = items.array[Math.floor(Math.random() * (JSON.parse(localStorage.getItem('items')).array.length-1 - 2 + 1)) + 2];
                
                    }
        return postText,selectedValue,x;
    })
} 
    
function replace() {
    checkValue()
    if(postText!==undefined){
        thirdBlockText.innerHTML=''
        const newParagraph = document.createElement('p');
        newParagraph.textContent=postText;
        thirdBlockText.appendChild(newParagraph);
    } else {
       alert('Zaznacz wartość z pierwszego bloku')
    } 
    x=JSON.parse(localStorage.getItem('items')).array.length-2;
    return x;
}

function add(){
    checkValue()
    if(postText!==undefined){
        if(thirdBlockText.textContent.includes(postText)){
            if(selectedValue==='3'){
                if (x>0) {
                    add()
                } else {
            alert('wszystkie losowe paragrafy zostały dodane') 
            }
        } else {
        alert('Nie można nadpisać paragrafów') 
        }
    }else{
        if(selectedValue==='3'){
        x=x-1;
    } 
    const newParagraph = document.createElement('p');
    newParagraph.textContent=postText;
    thirdBlockText.appendChild(newParagraph);
    sortParagraphs();
    }     
    } else {
        alert('Zaznacz wartość z pierwszego bloku')
    }
    return x;
}

function show() {
    nameSurname.classList.remove('header__text__par--disactive');
}
function reset() {
    localStorage.clear();
}
function showLocalStorage() {
    document.querySelector('.panel').classList.toggle('panel--active')
}

    function sortParagraphs() {
      const paragraphs = Array.from(thirdBlockText.getElementsByTagName('p'));
      paragraphs.sort((a, b) => {
        const textA = a.textContent.toUpperCase();
        const textB = b.textContent.toUpperCase();
        if (textA < textB) {
          return -1;
        }
        if (textA > textB) {
          return 1;
        }
        return 0;
      });
      while (thirdBlockText.firstChild) {
        thirdBlockText.removeChild(thirdBlockText.firstChild);
      }
      paragraphs.forEach(paragraph => {
        thirdBlockText.appendChild(paragraph);
      });
    }


footerBtn.addEventListener('click',showLocalStorage)
footerBtn1.addEventListener('click',reset)
footerBtn2.addEventListener('click',show)
secondBlockBtn1.addEventListener('click', replace)
secondBlockBtn2.addEventListener('click', add)
addBtn.addEventListener('click', addItem)
deleteBtn.addEventListener('click', deleteItem)



