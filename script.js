const inputTarefa = document.querySelector(".input-tarefa input");
const buttonTarefa = document.querySelector(".input-tarefa button");
const listaTarefas = document.querySelector(".lista-tarefas");
const criaTarefa = (texto) => {
  if (texto !== "") {
    listaTarefas.innerHTML += `      <li>
        <div class="setas">
          <button class="button-cima"><img src="./img/seta-cima.svg" alt=""></button>
          <button class="button-baixo"><img src="./img/seta-baixo.svg" alt=""></button>
        </div>
        <span class="ativo">${texto}</span>
        <input type="text">
        <div class="buttons">
          <button class="button-edita"><img src="./img/editar.svg" alt=""></button>
          <div class="paleta-cores">
            <span class="branco" data-cor="rgb(255, 255, 255)"></span>
            <span class="azul" data-cor="rgb(160, 196, 255)"></span>
            <span class="amarelo" data-cor="rgb(253, 255, 182)"></span>
            <span class="vermelho" data-cor="rgb(255, 173, 173)"></span>
            <span class="verde" data-cor="rgb(202, 255, 191)"></span>
          </div>
          <button class="button-apaga"><img src="./img/apagar.svg" alt=""></button>
        </div>
      </li>`;
    iteraItens();
    const arraySpans = document
      .querySelectorAll(".lista-tarefas li > span")
      .forEach((span) => {
        span.addEventListener("click", concluiTarefa);
      });
  }
};

const salvaTarefa = () => {
  const listaArray = Array.from(listaTarefas.children);
  const listaArrayAtualizada = listaArray.map((tarefa) => {
    const cor = getComputedStyle(tarefa).backgroundColor;
    const texto = tarefa.innerText;
    const concluido =
      getComputedStyle(tarefa.children[1]).textDecoration ===
      "line-through solid rgb(0, 0, 0)"
        ? true
        : false;
    return {
      texto: texto,
      cor: cor,
      concluido: concluido,
    };
  });
  localStorage.tarefas = JSON.stringify(listaArrayAtualizada);
};

const localStorageNoDOM = () => {
  if (localStorage.tarefas) {
    const listaLocalStorage = JSON.parse(localStorage.tarefas);
    listaLocalStorage.forEach((tarefa) => {
      criaTarefa(tarefa.texto);
    });
    const listaArray = Array.from(listaTarefas.children);
    listaArray.forEach((tarefa, index) => {
      tarefa.style.backgroundColor = listaLocalStorage[index].cor;
      listaLocalStorage[index].concluido === true
        ? (tarefa.children[1].style.textDecoration =
            "line-through solid rgb(0, 0, 0)")
        : "none solid rgb(0, 0, 0)";
    });
  }
};
const editaTarefa = (event) => {
  const tarefaLista = event.currentTarget.parentElement.parentElement;
  const inputTarefa = event.currentTarget.parentElement.previousElementSibling;
  const spanTarefa =
    event.currentTarget.parentElement.previousElementSibling
      .previousElementSibling;
  if (!inputTarefa.classList.contains("ativo")) {
    spanTarefa.classList.toggle("ativo");
    inputTarefa.classList.toggle("ativo");
    inputTarefa.value = spanTarefa.innerText;
    inputTarefa.focus();
  } else {
    spanTarefa.innerText = inputTarefa.value;
    spanTarefa.classList.toggle("ativo");
    inputTarefa.classList.toggle("ativo");
    salvaTarefa();
  }
  const paletasCores = document.querySelectorAll(".paleta-cores");
  event.currentTarget.nextElementSibling.classList.toggle("ativo");
  paletasCores.forEach((paletaCores) => {
    [...paletaCores.children].forEach((cor) => {
      cor.addEventListener("click", () => {
        cor.parentElement.parentElement.parentElement.style.backgroundColor =
          cor.getAttribute("data-cor");
        salvaTarefa();
      });
    });
  });
};

const removeTarefa = (event) => {
  event.currentTarget.parentElement.parentElement.remove();
  salvaTarefa();
};
const concluiTarefa = (event) => {
  if (event.currentTarget.style.textDecoration !== "line-through") {
    event.currentTarget.style.textDecoration = "line-through";
    salvaTarefa();
  } else {
    event.currentTarget.style.textDecoration = "initial";
    salvaTarefa();
  }
};
const iteraItens = () => {
  const buttonApaga = document
    .querySelectorAll(".lista-tarefas .button-apaga")
    .forEach((button) => {
      button.addEventListener("click", removeTarefa);
    });
  const buttonEdita = document
    .querySelectorAll(".lista-tarefas .button-edita")
    .forEach((button) => {
      button.addEventListener("click", editaTarefa);
    });
  const botaoCima = document
    .querySelectorAll(".setas .button-cima")
    .forEach((button) => {
      button.addEventListener("click", (event) => {
        if (
          event.currentTarget.parentElement.parentElement
            .previousElementSibling !== null
        ) {
          listaTarefas.insertBefore(
            event.currentTarget.parentElement.parentElement,
            event.currentTarget.parentElement.parentElement
              .previousElementSibling
          );
          salvaTarefa();
        }
      });
    });
  const botaoBaixo = document
    .querySelectorAll(".setas .button-baixo")
    .forEach((button) => {
      button.addEventListener("click", (event) => {
        if (
          event.currentTarget.parentElement.parentElement.nextElementSibling !==
          null
        ) {
          listaTarefas.insertBefore(
            event.currentTarget.parentElement.parentElement.nextElementSibling,
            event.currentTarget.parentElement.parentElement
          );
          salvaTarefa();
        }
      });
    });
};

const addEventsList = () => {
  inputTarefa.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
      criaTarefa(inputTarefa.value);
      salvaTarefa();
      inputTarefa.value = "";
    }
  });
  buttonTarefa.addEventListener("click", () => {
    criaTarefa(inputTarefa.value);
    salvaTarefa();
    inputTarefa.value = "";
  });
  window.addEventListener("load", localStorageNoDOM);
};

addEventsList();
