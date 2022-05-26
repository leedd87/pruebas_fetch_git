console.log('hello universo')

let arrayData
async function getData() {
   await fetch("https://amazing-events.herokuapp.com/api/events")
      .then(response => response.json())
      .then(json => arrayData = json)

   let eventosDate = arrayData.currentDate;
   let eventosArray = arrayData.events;

   // console.log(arrayCategorias)
   console.log(eventosArray)
   console.log(eventosDate)
   // console.log(arrayData.events)
   // console.log(arrayCategorias)

   return [eventosDate, eventosArray] //return entre []
}

arrayData = await getData();

// // console.log(arrayData)

let fechaActual = arrayData[0];
let arrayEventos = arrayData[1];

console.log(arrayEventos)


let contenedorCheckBox = document.getElementById('contenedor_checkbox');


//sacar solo las categorias del array

let arrayCategorias = arrayEventos.map(categoria => categoria.category);



arrayCategorias = new Set(arrayCategorias);

arrayCategorias = [...arrayCategorias];



function displayCheckBox() {

   let templateHtml = '';

   arrayCategorias.forEach(element => {

      templateHtml += `
      <label>${element}
      <input type="checkbox" name="${element}" value="${element}">
      </label>
      
      `
      contenedorCheckBox.innerHTML = templateHtml;
   })
}


displayCheckBox();

let checkBox = document.querySelectorAll('input[type=checkbox]');

console.log(checkBox)

let checkBoxAcumulador = []

checkBox.forEach(element => element.addEventListener('change', (evento) => {
   let checked = evento.target.checked;
   if (checked) {
      checkBoxAcumulador.push(evento.target.value)
      console.log(checkBoxAcumulador)
      filtroCards()
   } else {
      checkBoxAcumulador = checkBoxAcumulador.filter(uncheck => uncheck !== evento.target.value)
      console.log(checkBoxAcumulador)
      filtroCards()
   }

}))

//crear filtroCards => necesita el acumulador

let contenedorCards = document.getElementById('contenedor_tarjetas')

function filtroCards() {

   let acumulador = []
   if (checkBoxAcumulador.length > 0) {
      checkBoxAcumulador.map(chequeado => {
         acumulador.push(...arrayEventos.filter(evento => evento.category == chequeado))
      })

   } else {
      acumulador.push(...arrayEventos)
   }
   console.log(acumulador)
   crearCards(acumulador)
}
filtroCards()


function crearCards(array) {

   let templateCard = '';

   array.forEach(element => {

      templateCard += `
      <div>${element.name}</div>
      
      `
      contenedorCards.innerHTML = templateCard;


   })

}