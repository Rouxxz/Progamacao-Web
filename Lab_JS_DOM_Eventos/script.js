// --- SELEÇÃO DE ELEMENTOS DO DOM ---
const form = document.getElementById("form-projeto");
const inputNome = document.getElementById("nome");
const espelhoNome = document.getElementById("espelho-nome");
const contadorNome = document.getElementById("contador-nome");

const inputEmail = document.getElementById("email");
const msgEmail = document.getElementById("msg-email");

const inputSenha = document.getElementById("senha");
const indicadorForca = document.getElementById("indicador-forca");
const msgSenha = document.getElementById("msg-senha");

const selectEstado = document.getElementById("estado");
const selectCidade = document.getElementById("cidade-proj");

const checkboxTermos = document.getElementById("termos");
const btnSubmit = document.getElementById("btn-submit");
const sumarioErros = document.getElementById("sumario-erros");

// Base de dados para select dependente (Estado -> Cidade)
const cidadesPorUF = {
  SP: ["Campinas", "São Paulo", "Santos", "Ribeirão Preto"],
  RJ: ["Rio de Janeiro", "Niterói", "Angra dos Reis", "Petrópolis"],
  MG: ["Belo Horizonte", "Uberlândia", "Ouro Preto", "Juiz de Fora"]
};

// --- ETAPA 1: CONTADOR E ESPELHO DE CARACTERES ---
inputNome.addEventListener("input", (e) => {
  const valor = e.target.value;
  espelhoNome.textContent = "Você digitou: " + valor;
  contadorNome.textContent = `${valor.length}/50`;

  if (valor.length > 50) {
    inputNome.classList.add("campo-erro");
    contadorNome.classList.add("texto-erro");
  } else {
    inputNome.classList.remove("campo-erro");
    contadorNome.classList.remove("texto-erro");
  }
  validarFormularioCompleto();
});

// --- ETAPA 3: FOCO E BLUR NO E-MAIL ---
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

inputEmail.addEventListener("focus", () => {
  if (inputEmail.value.trim() === "") {
    msgEmail.textContent = "Ex.: usuario@dominio.com";
  }
});

inputEmail.addEventListener("blur", () => {
  const emailValido = regexEmail.test(inputEmail.value.trim());
  if (!emailValido && inputEmail.value.length > 0) {
    msgEmail.textContent = "Formato de e-mail inválido.";
    inputEmail.classList.add("campo-erro");
    inputEmail.classList.remove("campo-ok");
  } else if (emailValido) {
    msgEmail.textContent = "E-mail válido.";
    inputEmail.classList.remove("campo-erro");
    inputEmail.classList.add("campo-ok");
  }
  validarFormularioCompleto();
});

// --- INDICADOR DE FORÇA DA SENHA ---
inputSenha.addEventListener("input", () => {
  const senha = inputSenha.value;
  let forca = 0;

  if (senha.length >= 6) forca++;
  if (/[A-Z]/.test(senha)) forca++;
  if (/[0-9]/.test(senha) || /[^a-zA-Z0-9]/.test(senha)) forca++;

  indicadorForca.className = "barra-forca";

  if (senha.length === 0) {
    msgSenha.textContent = "Força: -";
  } else if (forca === 1) {
    indicadorForca.classList.add("forca-fraca");
    msgSenha.textContent = "Força: Fraca";
  } else if (forca === 2) {
    indicadorForca.classList.add("forca-media");
    msgSenha.textContent = "Força: Média";
  } else {
    indicadorForca.classList.add("forca-forte");
    msgSenha.textContent = "Força: Forte";
  }
  validarFormularioCompleto();
});

// --- ETAPA 2: SELECT DEPENDENTE ---
selectEstado.addEventListener("change", () => {
  const uf = selectEstado.value;
  selectCidade.innerHTML = "";

  if (!uf) {
    selectCidade.disabled = true;
    selectCidade.innerHTML = '<option value="">Selecione primeiro o estado</option>';
  } else {
    selectCidade.disabled = false;
    const optDefault = document.createElement("option");
    optDefault.value = "";
    optDefault.textContent = "Selecione uma Cidade";
    selectCidade.append(optDefault);

    cidadesPorUF[uf].forEach((c) => {
      const opt = document.createElement("option");
      opt.value = c;
      opt.textContent = c;
      selectCidade.append(opt);
    });
  }
  validarFormularioCompleto();
});

selectCidade.addEventListener("change", validarFormularioCompleto);
checkboxTermos.addEventListener("change", validarFormularioCompleto);

// --- FUNÇÃO DE VALIDAÇÃO GERAL (CONTROLA BOTÃO SUBMIT E SUMÁRIO DE ERROS) ---
function validarFormularioCompleto() {
  const erros = [];

  if (inputNome.value.trim().length < 3 || inputNome.value.length > 50) {
    erros.push("O nome deve ter entre 3 e 50 caracteres.");
  }
  if (!regexEmail.test(inputEmail.value.trim())) {
    erros.push("Informe um e-mail válido.");
  }
  if (inputSenha.value.length < 6) {
    erros.push("A senha deve ter no mínimo 6 caracteres.");
  }
  if (!selectEstado.value) {
    erros.push("Selecione um Estado.");
  }
  if (!selectCidade.value) {
    erros.push("Selecione uma Cidade.");
  }
  if (!checkboxTermos.checked) {
    erros.push("É necessário aceitar os termos de serviço.");
  }

  // Atualiza o Sumário de Erros no DOM
  if (erros.length > 0) {
    sumarioErros.hidden = false;
    sumarioErros.innerHTML = "<strong>Pendências do formulário:</strong><ul>" + 
      erros.map(e => `<li>${e}</li>`).join("") + "</ul>";
    btnSubmit.disabled = true; // Desabilita o botão se houver erros
  } else {
    sumarioErros.hidden = true;
    sumarioErros.innerHTML = "";
    btnSubmit.disabled = false; // Habilita o botão quando tudo for válido
  }
}

// --- SUBMIT E RESET ---
form.addEventListener("submit", (e) => {
  e.preventDefault(); // Impede o envio tradicional/reload da página

  alert("Formulário cadastrado com sucesso!");

  // Reseta o formulário e os estados dos componentes visuais
  form.reset();
  selectCidade.disabled = true;
  selectCidade.innerHTML = '<option value="">Selecione primeiro o estado</option>';
  indicadorForca.className = "barra-forca";
  msgSenha.textContent = "Força: -";
  espelhoNome.textContent = "Você digitou: ";
  contadorNome.textContent = "0/50";
  inputEmail.classList.remove("campo-ok", "campo-erro");
  inputNome.classList.remove("campo-erro");
  
  validarFormularioCompleto();
});

// Validação inicial ao carregar a página
validarFormularioCompleto();
