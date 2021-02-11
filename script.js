const addBtn = document.querySelector('#add');

addBtn.addEventListener('click', () => addNewMemo());

 ///// local storage ///////////
const memos = JSON.parse(localStorage.getItem('memos'));

if(memos) {
    memos.forEach(memo => addNewMemo(memo))
}


function addNewMemo(text = '') {
    const memos = document.querySelector('.memos');
    const memo = document.createElement('div')
    memo.classList.add('memo')
     // adding date
    addDate = new Date().toLocaleString(); 

    // creating template to add when a memo is done, its commented on the html
    // and added ternary operator with dynamic classes
    memo.innerHTML = `
        <div class="memo-btns">
            <button class="edit-btn"><i class="far fa-edit"></i></button>
            <p>Edit/Save</p>
            <button class="delete-btn"><i class="far fa-trash-alt"></i></button>
        </div>
        <div class="add-text ${text ? "" : "hidden"}"></div>
        <textarea class="${text ? "hidden" : ""}" ></textarea> 
        <p class="addDate">Added: ${addDate}</p>
          
    `
    

    const addText = memo.querySelector('.add-text');
    const textArea = memo.querySelector('textarea');
    const editBtn = memo.querySelector('.edit-btn');
    const deleteBtn = memo.querySelector('.delete-btn');

     // markdown get value from text area
    textArea.value = text;
    addText.innerHTML = marked(text);

        // delete button
    deleteBtn.addEventListener('click', () => {
        memo.remove();

        // update localstorage
        updateLocalStorage();
    })

    // add edit button, same as save add toggle to class hidden on addtext and textArea
    editBtn.addEventListener('click', () => {
        addText.classList.toggle('hidden');
        textArea.classList.toggle('hidden');
    })

    // get the input value from the text area to markdown
    textArea.addEventListener('input', (e) => {
        const { value } = e.target;

        addText.innerHTML = marked(value);

            ////// localStorage ////////////
        updateLocalStorage();
    })
    
    memos.appendChild(memo);
    document.querySelector(main).appendChild(memos)
    /* document.body.appendChild(memo); */
}

////////////// localStorage /////////////////

function updateLocalStorage () {
    const memoInput = document.querySelectorAll('textarea');

    // the memo array, where the added memos go in
    const memos = []

        // for each memo add the value to the array of memos
    memoInput.forEach(memo => memos.unshift(memo.value));

    // localstorage json
    localStorage.setItem('memos', JSON.stringify(memos));
}



/* 
// basic localstorage set get
localStorage.setItem('name', JSON.stringify())
JSON.parse(localStorage.getItem('name'))
localStorage.removeItem('name') */