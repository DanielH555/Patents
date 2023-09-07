
const inventor = document.querySelector('#inventor')
const patentName = document.querySelector('#patentName')
const PatentDes = document.querySelector('#PatentDes')
const addPatentBtn = document.querySelector('#addPatentBtn')
const search = document.querySelector('#search')

function editing(name, description, inventor, apend, params) {

  const input1 = document.createElement('input')
  const input2 = document.createElement('input')
  const input3 = document.createElement('textarea')
  const editBtn = document.createElement('button')

  input1.placeholder = "name"
  input2.placeholder = "inventor"
  input3.placeholder = "description"

  input1.value = name
  input2.value = inventor
  input3.value = description

  input1.classList = "form-control mb-2"
  input2.classList = "form-control mb-2"
  input3.classList = "form-control mb-2"
  editBtn.classList = "btn btn-primary m-3 w-25"

  editBtn.textContent = "Submit"

  editBtn.addEventListener('click', () => {
    const obj = {
      name: input1.value,
      inventor: input2.value,
      description: input3.value
    }
    edit(params, obj)
  })
  apend.append(input1, input2, input3, editBtn)
}

function renderPatentList(patents) {
  const patentList = document.getElementById("patent-list");
  patentList.innerHTML = "";
  patents.forEach(patent => {

    const btnDiv = document.createElement('div')
    const editPatent = document.createElement('button')
    const deleteBtn = document.createElement('button')
    deleteBtn.addEventListener('click', async () => {
      deleting(patent._id)
    })

    editPatent.addEventListener('click', async () => {
      cardBody.innerHTML = ''
      editing(patent.name, patent.description, patent.inventor, cardBody, patent._id)
    })


    const card = document.createElement("div");
    const cardBody = document.createElement("div");

    const cardName = document.createElement("h5");
    const inventor = document.createElement("p");
    const cardDes = document.createElement("p");

    cardName.innerText = `Patent name: ` + patent.name;
    inventor.textContent = `Patent inventor: ` + patent.inventor;
    cardDes.innerText = `description:  ` + patent.description;

    editPatent.textContent = 'Edit patent'
    deleteBtn.textContent = `delete patent`

    card.classList.add("card", "mb-4");
    cardBody.classList.add("card-body");
    cardName.classList.add("card-title");
    cardDes.classList.add("card-text");
    inventor.classList = 'card-text'
    editPatent.classList = "btn btn-primary m-3 w-25"
    deleteBtn.classList = "btn btn-danger m-3 w-50 "

    btnDiv.append(editPatent, deleteBtn)
    cardBody.append(cardName, inventor, cardDes, btnDiv);
    card.appendChild(cardBody);
    patentList.appendChild(card, btnDiv);
  });
}

const url = "http://127.0.0.1:4000/patent/";
async function gettingItems() {
  try {
    const results = await fetch(url + 'home', { mode: "cors" })
    const data = await results.json()
    renderPatentList(data);
  } catch (err) {
throw err
  }
}
gettingItems()

addPatentBtn.addEventListener('click', async () => {
  try {
    await fetch(url + 'add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: patentName.value, description: PatentDes.value
        , inventor: inventor.value
      })
    })
    gettingItems()
  } catch (error) {
    throw error
  }
})

async function deleting(params) {
  try {
    await fetch(url + `delete/${params}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },

    })
    gettingItems()
  } catch (error) {
    throw error
  }
}

async function edit(params, obj) {
  try {
    await fetch(url + `update/${params}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(obj)

    })
    gettingItems()
  } catch (error) {
    throw error
  }
}

search.addEventListener('keyup', async (e) => {
const name = (e.target.value);
  try {
    const result = await fetch(url + `byname/${name} `)
    const data = await result.json()
    renderPatentList(data)
  } catch (error) {
   throw error
  }
})


