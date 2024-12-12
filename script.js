const inputTarefas = document.querySelector("[data-form] input");
const buttonTarefas = document.querySelector("[data-form] button");
const listaTarefas = document.querySelector("[data-container] ul");
function criaTarefa(event) {
  event.preventDefault();
  const liTarefa = document.createElement("li");
  liTarefa.style.backgroundColor = "rgb(255, 255, 255)";
  liTarefa.style.textDecoration = "none"
  const containerSetas = document.createElement("div");
  const liSetaCima = document.createElement("img");
  const liSetaBaixo = document.createElement("img");
  const liSpan = document.createElement("span");
  const liButtonEdita = document.createElement("button");
  const liButtonEditaImg = document.createElement("img");
  const liButtonApaga = document.createElement("button");
  const liButtonApagaImg = document.createElement("img");
  if (inputTarefas.value !== "") {
    listaTarefas.appendChild(liTarefa);
    liTarefa.classList.add("tarefa");
    liTarefa.appendChild(containerSetas);
    containerSetas.classList.add("setas");
    containerSetas.appendChild(liSetaCima);
    liSetaCima.setAttribute("src", "./img/seta-cima.svg");
    containerSetas.appendChild(liSetaBaixo);
    liSetaBaixo.setAttribute("src", "./img/seta-baixo.svg");
    liTarefa.appendChild(liSpan);
    liSpan.innerText = inputTarefas.value;
    liTarefa.appendChild(liButtonEdita);
    liButtonEdita.classList.add("button-edita");
    liButtonEdita.appendChild(liButtonEditaImg);
    liButtonEditaImg.setAttribute("src", "./img/editar.svg");
    liTarefa.appendChild(liButtonApaga);
    liButtonApaga.classList.add("button-apaga");
    liButtonApaga.appendChild(liButtonApagaImg);
    liButtonApagaImg.setAttribute("src", "./img/apagar.svg");
    const containerPaleta = document.createElement("div");
    const buttonBranco = document.createElement("button");
    const buttonAzul = document.createElement("button");
    const buttonAmarelo = document.createElement("button");
    const buttonVermelho = document.createElement("button");
    const buttonVerde = document.createElement("button");
    liTarefa.appendChild(containerPaleta);
    containerPaleta.classList.add("paleta");
    containerPaleta.appendChild(buttonBranco);
    buttonBranco.classList.add("button-paleta", "branco");
    containerPaleta.appendChild(buttonAzul);
    buttonAzul.classList.add("button-paleta", "azul");
    containerPaleta.appendChild(buttonAmarelo);
    buttonAmarelo.classList.add("button-paleta", "amarelo");
    containerPaleta.appendChild(buttonVermelho);
    buttonVermelho.classList.add("button-paleta", "vermelho");
    containerPaleta.appendChild(buttonVerde);
    buttonVerde.classList.add("button-paleta", "verde");
    const liInput = document.createElement("input");
    liTarefa.setAttribute("id", Date.now());
    salvaTarefa(inputTarefas.value, liTarefa.style.backgroundColor, liTarefa.style.textDecoration === "line-through");
    inputTarefas.value = "";
    function editaTarefa(event) {
      event.preventDefault();
      containerPaleta.classList.toggle("ativo");
      liTarefa.insertBefore(liInput, liButtonEdita);
      if (containerPaleta.classList.contains("ativo")) {
        liInput.classList.add("ativo");
        liInput.value = liSpan.innerText;
        liSpan.remove();
      } else {
        liInput.remove();
        liTarefa.insertBefore(liSpan, liButtonEdita);
        liSpan.innerText = liInput.value;
        modificaTarefaCorTexto(
          liTarefa.getAttribute("id"),
          liTarefa.style.backgroundColor,
          liSpan.innerText  
        );
      }
    }
    function removeTarefa() {
      removeTarefaMemoria(liTarefa.getAttribute("id"))
      liTarefa.remove();
    }
    function concluiTarefa() {
      if (liSpan.style.textDecoration === "line-through"){
        liSpan.style.textDecoration = "none";
        modificaTarefaEstado(liSpan.style.textDecoration === "line-through", liTarefa.getAttribute("id"))
      }
      else {
        liSpan.style.textDecoration = "line-through";
        modificaTarefaEstado(liSpan.style.textDecoration === "line-through", liTarefa.getAttribute("id"))
      }
    }
    function salvaTarefa(texto, cor, bolean) {
      let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
      
      const id = Date.now();
      tarefas.push({
        id: id,
        texto: texto,
        cor: cor,
        concluido: bolean,
      });
      localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }
    function modificaTarefaCorTexto(id, backgroundColor, novoTexto) {
      let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
      const tarefaEncontrada = tarefas.find(tarefa => String(tarefa.id) === id);
      if(tarefaEncontrada){
        tarefaEncontrada["cor"] = backgroundColor;
        tarefaEncontrada["texto"] = novoTexto;
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
      }
    }
    function modificaTarefaEstado(bolean, id){
      let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
      const tarefaEncontrada = tarefas.find(tarefa => String(tarefa.id) === id);
      if(tarefaEncontrada){
        tarefaEncontrada["concluido"] = bolean;
        localStorage.setItem("tarefas", JSON.stringify(tarefas));
      }
    }
    function removeTarefaMemoria(id){
      let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
      const tarefaEncontrada = tarefas.find(tarefa => String(tarefa.id) === id);
      tarefas = tarefas.filter((tarefa) => tarefa.id !== tarefaEncontrada.id);
      localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }
    liSetaCima.addEventListener("click", () => {
      const elementoAnterior = liTarefa.previousElementSibling;
      if (elementoAnterior) {
        listaTarefas.insertBefore(liTarefa, elementoAnterior);
      }
    });
    liSetaBaixo.addEventListener("click", () => {
      const elementoPosterior = liTarefa.nextElementSibling;
      if (elementoPosterior) {
        listaTarefas.insertBefore(elementoPosterior, liTarefa);
      }
    });
    liSpan.addEventListener("click", concluiTarefa);
    liButtonApaga.addEventListener("click", removeTarefa);
    liButtonEdita.addEventListener("click", editaTarefa);
    buttonBranco.addEventListener("click", () => {
      liTarefa.style.backgroundColor = "#FFFFFF";
    });
    buttonAzul.addEventListener("click", () => {
      liTarefa.style.backgroundColor = "#A0C4FF";
    });
    buttonAmarelo.addEventListener("click", () => {
      liTarefa.style.backgroundColor = "#FDFFB6";
    });
    buttonVermelho.addEventListener("click", () => {
      liTarefa.style.backgroundColor = "#FFADAD";
    });
    buttonVerde.addEventListener("click", () => {
      liTarefa.style.backgroundColor = "#CAFFBF";
    });
  }
}
function setaTarefa(){
  let tarefas = JSON.parse(localStorage.getItem("tarefas"));
  if (tarefas) {
    tarefas.forEach((tarefa) => {
      const liTarefa = document.createElement("li");
      const containerSetas = document.createElement("div");
      const liSetaCima = document.createElement("img");
      const liSetaBaixo = document.createElement("img");
      const liSpan = document.createElement("span");
      const liButtonEdita = document.createElement("button");
      const liButtonEditaImg = document.createElement("img");
      const liButtonApaga = document.createElement("button");
      const liButtonApagaImg = document.createElement("img");
      listaTarefas.appendChild(liTarefa);
      liTarefa.classList.add("tarefa");
      liTarefa.appendChild(containerSetas);
      containerSetas.classList.add("setas");
      containerSetas.appendChild(liSetaCima);
      liSetaCima.setAttribute("src", "./img/seta-cima.svg");
      containerSetas.appendChild(liSetaBaixo);
      liSetaBaixo.setAttribute("src", "./img/seta-baixo.svg");
      liTarefa.appendChild(liSpan);
      liTarefa.appendChild(liButtonEdita);
      liButtonEdita.classList.add("button-edita");
      liButtonEdita.appendChild(liButtonEditaImg);
      liButtonEditaImg.setAttribute("src", "./img/editar.svg");
      liTarefa.appendChild(liButtonApaga);
      liButtonApaga.classList.add("button-apaga");
      liButtonApaga.appendChild(liButtonApagaImg);
      liButtonApagaImg.setAttribute("src", "./img/apagar.svg");
      const containerPaleta = document.createElement("div");
      const buttonBranco = document.createElement("button");
      const buttonAzul = document.createElement("button");
      const buttonAmarelo = document.createElement("button");
      const buttonVermelho = document.createElement("button");
      const buttonVerde = document.createElement("button");
      liTarefa.appendChild(containerPaleta);
      containerPaleta.classList.add("paleta");
      containerPaleta.appendChild(buttonBranco);
      buttonBranco.classList.add("button-paleta", "branco");
      containerPaleta.appendChild(buttonAzul);
      buttonAzul.classList.add("button-paleta", "azul");
      containerPaleta.appendChild(buttonAmarelo);
      buttonAmarelo.classList.add("button-paleta", "amarelo");
      containerPaleta.appendChild(buttonVermelho);
      buttonVermelho.classList.add("button-paleta", "vermelho");
      containerPaleta.appendChild(buttonVerde);
      buttonVerde.classList.add("button-paleta", "verde");
      const liInput = document.createElement("input");
      liTarefa.setAttribute("id", tarefa["id"])
      liSpan.innerText = tarefa["texto"];
      liTarefa.style.backgroundColor = tarefa["cor"];
      if(tarefa["concluido"])
        liSpan.style.textDecoration = "line-through"
      else
        liSpan.style.textDecoration = "none"
        function editaTarefa(event) {
          event.preventDefault();
          containerPaleta.classList.toggle("ativo");
          liTarefa.insertBefore(liInput, liButtonEdita);
          if (containerPaleta.classList.contains("ativo")) {
            liInput.classList.add("ativo");
            liInput.value = liSpan.innerText;
            liSpan.remove();
          } else {
            liInput.remove();
            liTarefa.insertBefore(liSpan, liButtonEdita);
            liSpan.innerText = liInput.value;
            modificaTarefaCorTexto(
              liTarefa.getAttribute("id"),
              liTarefa.style.backgroundColor,
              liSpan.innerText  
            );
          }
        }
        function removeTarefa() {
          removeTarefaMemoria(liTarefa.getAttribute("id"))
          liTarefa.remove();
        }
        function concluiTarefa() {
          if (liSpan.style.textDecoration === "line-through"){
            liSpan.style.textDecoration = "none";
            modificaTarefaEstado(liSpan.style.textDecoration === "line-through", liTarefa.getAttribute("id"))
          }
          else {
            liSpan.style.textDecoration = "line-through";
            modificaTarefaEstado(liSpan.style.textDecoration === "line-through", liTarefa.getAttribute("id"))
          }
        }
        function modificaTarefaCorTexto(id, backgroundColor, novoTexto) {
          let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
          const tarefaEncontrada = tarefas.find(tarefa => String(tarefa.id) === id);
          if(tarefaEncontrada){
            tarefaEncontrada["cor"] = backgroundColor;
            tarefaEncontrada["texto"] = novoTexto;
            localStorage.setItem("tarefas", JSON.stringify(tarefas));
          }
        }
        function modificaTarefaEstado(bolean, id){
          let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
          const tarefaEncontrada = tarefas.find(tarefa => String(tarefa.id) === id);
          console.log(tarefaEncontrada);
          if(tarefaEncontrada){
            tarefaEncontrada["concluido"] = bolean;
            localStorage.setItem("tarefas", JSON.stringify(tarefas));
          }
        }
        function removeTarefaMemoria(id){
          let tarefas = JSON.parse(localStorage.getItem("tarefas")) || [];
          const tarefaEncontrada = tarefas.find(tarefa => String(tarefa.id) === id);
          tarefas = tarefas.filter((tarefa) => tarefa.id !== tarefaEncontrada.id);
          localStorage.setItem("tarefas", JSON.stringify(tarefas));
        }
        liSetaCima.addEventListener("click", () => {
          const elementoAnterior = liTarefa.previousElementSibling;
          if (elementoAnterior) {
            listaTarefas.insertBefore(liTarefa, elementoAnterior);
          }
        });
        liSetaBaixo.addEventListener("click", () => {
          const elementoPosterior = liTarefa.nextElementSibling;
          if (elementoPosterior) {
            listaTarefas.insertBefore(elementoPosterior, liTarefa);
          }
        });
        liSpan.addEventListener("click", concluiTarefa);
        liButtonApaga.addEventListener("click", removeTarefa);
        liButtonEdita.addEventListener("click", editaTarefa);
        buttonBranco.addEventListener("click", () => {
          liTarefa.style.backgroundColor = "#FFFFFF";
        });
        buttonAzul.addEventListener("click", () => {
          liTarefa.style.backgroundColor = "#A0C4FF";
        });
        buttonAmarelo.addEventListener("click", () => {
          liTarefa.style.backgroundColor = "#FDFFB6";
        });
        buttonVermelho.addEventListener("click", () => {
          liTarefa.style.backgroundColor = "#FFADAD";
        });
        buttonVerde.addEventListener("click", () => {
          liTarefa.style.backgroundColor = "#CAFFBF";
        });
    });

  }
}
window.addEventListener("load", setaTarefa)
buttonTarefas.addEventListener("click", criaTarefa);


