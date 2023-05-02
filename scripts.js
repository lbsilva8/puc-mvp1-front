/*Função para obter a lista existente do servidor via requisição GET */
const getList = async () => {
  let url = 'http://127.0.0.1:5000/series';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      data.series.forEach(item => insertList(item.nome, item.status, item.temporada, item.aplicativo))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

/* Chamada para carregamento inicial dos dados */
getList()

/* Função para colocar um item na lista do servidor via requisição POST */
const postSerie = async (inputSerie, inputStatus, inputTemporada, inputAplicativo) => {
  const formData = new FormData();
  formData.append('nome', inputSerie);
  formData.append('status', inputStatus);
  formData.append('temporada', inputTemporada);
  formData.append('aplicativo', inputAplicativo);
  
  let url = 'http://127.0.0.1:5000/serie';
  fetch(url, {
    method: 'post',
    body: formData
  })
    .then((response) => {
      if (response.status == 200){
        insertList(inputSerie, inputStatus, inputTemporada, inputAplicativo);
        alert("Item adicionado!")
      response.json()
      }else if (response.status == 409){
        alert("Item de mesmo nome já cadastrado.")
      }})
    .catch((error) => {
      console.error('Error:', error);
    });
}

/* Função para criar um botão close para cada item da lista */
const insertButtonClose = (parent) => {
  let span = document.createElement("span");
  let txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  parent.appendChild(span);
}

/* Função para remover um item da lista de acordo com o click no botão close */
const removeElement = () => {
  let close = document.getElementsByClassName("close");
  let i;
  for (i = 0; i < close.length; i++) {
    close[i].onclick = function () {
      let div = this.parentElement.parentElement;
      const nomeItem = div.getElementsByTagName('td')[0].innerHTML
      if (confirm("Você tem certeza que quer remover esse item definitivamente?")) {
        div.remove()
        deleteItem(nomeItem)
        alert("Item removido com secesso!")
      }
    }
  }
}

/* Função para deletar um item da lista do servidor via requisição DELETE */
const deleteItem = (item) => {
  console.log(item)
  let url = 'http://127.0.0.1:5000/serie?nome=' + item;
  fetch(url, {
    method: 'delete'
  })
    .then((response) => response.json())
    .catch((error) => {
      console.error('Error:', error);
    });
}

/* Função para adicionar um novo item */
const adicionarSerie = () => {
  let inputSerie = document.getElementById("novaSerie").value;
  let inputStatus = document.getElementById("status").value;
  let inputTemporada = document.getElementById("novaTemporada").value;
  let inputAplicativo = document.getElementById("novoAplicativo").value;
  
  if (inputSerie === '') {
    alert("Informe o nome de uma série!");
  } else if (inputTemporada === ''){
    alert("Informe a temporada da série.")
  } else if (isNaN(inputTemporada)) {
    alert("Temporada precisa estar no formato de número!");
  } else {
    postSerie(inputSerie, inputStatus, inputTemporada,inputAplicativo)
  }
}

/* Função para inserir items na lista apresentada */
const insertList = (serie, status, temporada, aplicativo) => {
  var item = [serie, status, temporada, aplicativo]
  var table = document.getElementById('minhaTabela');
  var row = table.insertRow();
  
  for (var i = 0; i < item.length; i++) {
    var cel = row.insertCell(i);
    cel.textContent = item[i];
  }
  insertButtonClose(row.insertCell(-1))
  document.getElementById("novaSerie").value = "";
  document.getElementById("status").value = "";
  document.getElementById("novaTemporada").value = "";
  document.getElementById("novoAplicativo").value = "";
  
  removeElement()
}


/* Função para filtrar items na lista apresentada */
/* Filtro coluna Série*/
document.getElementById("txtColuna1").addEventListener("input", PesquisarSerie);

function PesquisarSerie(){
var Coluna = "0";
var Filtrar, Tabela, tr, td, th, i;

Filtrar = document.getElementById("txtColuna1");
Filtrar = Filtrar.value.toUpperCase();

Tabela = document.getElementById("minhaTabela");
tr = Tabela.getElementsByTagName("tr");
th = Tabela.getElementsByTagName("th");

for ( i = 0; i <tr.length; i++) {
  td = tr[i].getElementsByTagName("td")[Coluna];
  if (td) {
    if (td.innerHTML.toUpperCase().indexOf(Filtrar) > -1){
      tr[i].style.display = "";
    } else {
      tr[i].style.display = "none";
    }
  }
}
}

/* Filtro coluna Status*/
document.getElementById("txtColuna2").addEventListener("input", PesquisarStatus);

function PesquisarStatus(){
var Coluna = "1";
var Filtrar, Tabela, tr, td, th, i;

Filtrar = document.getElementById("txtColuna2");
Filtrar = Filtrar.value.toUpperCase();

Tabela = document.getElementById("minhaTabela");
tr = Tabela.getElementsByTagName("tr");
th = Tabela.getElementsByTagName("th");

for ( i = 0; i <tr.length; i++) {
  td = tr[i].getElementsByTagName("td")[Coluna];
  if (td) {
    if (td.innerHTML.toUpperCase().indexOf(Filtrar) > -1){
      tr[i].style.display = "";
    } else {
      tr[i].style.display = "none";
    }
  }
}
}

/* Filtro coluna Aplicativo*/
document.getElementById("txtColuna4").addEventListener("input", PesquisarApp);

function PesquisarApp(){
var Coluna = "3";
var Filtrar, Tabela, tr, td, th, i;

Filtrar = document.getElementById("txtColuna4");
Filtrar = Filtrar.value.toUpperCase();

Tabela = document.getElementById("minhaTabela");
tr = Tabela.getElementsByTagName("tr");
th = Tabela.getElementsByTagName("th");

for ( i = 0; i <tr.length; i++) {
  td = tr[i].getElementsByTagName("td")[Coluna];
  if (td) {
    if (td.innerHTML.toUpperCase().indexOf(Filtrar) > -1){
      tr[i].style.display = "";
    } else {
      tr[i].style.display = "none";
    }
  }
}
}