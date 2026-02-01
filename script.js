let devices = {};

// Carrega a base de dispositivos
fetch("devices.json")
  .then(res => res.json())
  .then(data => {
    devices = data;
    carregarMarcas();
  });

// Splash screen (2s)
setTimeout(() => {
  document.getElementById("splash").style.display = "none";
  document.getElementById("app").classList.remove("hidden");
}, 2000);

// ====== SELECTS ======

function carregarMarcas() {
  const marca = document.getElementById("marca");
  marca.innerHTML = `<option value="">Selecione a marca</option>`;

  Object.keys(devices).forEach(m => {
    marca.innerHTML += `<option value="${m}">${m}</option>`;
  });

  carregarCategorias();
}

function carregarCategorias() {
  const marca = document.getElementById("marca").value;
  const categoria = document.getElementById("categoria");
  categoria.innerHTML = `<option value="">Selecione a categoria</option>`;

  if (devices[marca]) {
    Object.keys(devices[marca]).forEach(c => {
      categoria.innerHTML += `<option value="${c}">${c}</option>`;
    });
  }

  carregarLinhas();
}

function carregarLinhas() {
  const marca = document.getElementById("marca").value;
  const categoria = document.getElementById("categoria").value;
  const linha = document.getElementById("linha");

  linha.innerHTML = `<option value="">Selecione a linha</option>`;

  if (devices[marca] && devices[marca][categoria]) {
    Object.keys(devices[marca][categoria]).forEach(l => {
      linha.innerHTML += `<option value="${l}">${l}</option>`;
    });
  }
}

// ====== GERAÇÃO DA SENSIBILIDADE ======

function gerar() {
  const estilo = Number(document.getElementById("estilo").value);
  const hz = Number(document.getElementById("hz").value);

  const marca = document.getElementById("marca").value;
  const categoria = document.getElementById("categoria").value;
  const linha = document.getElementById("linha").value;
const dpiManual = document.getElementById("dpi").value;

  let sensi = estilo + hz;

  if (
    devices[marca] &&
    devices[marca][categoria] &&
    devices[marca][categoria][linha]
  ) {
    const d = devices[marca][categoria][linha];

    // Ajuste por DPI
    if (d.dpi > 480) sensi -= 5;
    else if (d.dpi < 350) sensi += 10;
    else sensi += 5;

    // Ajuste por tamanho de tela
    if (d.tela >= 6.8) sensi += 10;
    else if (d.tela <= 6.3) sensi -= 10;
  }

  sensi = Math.max(0, Math.min(200, sensi));

  document.getElementById("resultado").innerHTML = `
    🎯 <b>Geral:</b> ${sensi}<br><br>
    🔴 Red Dot: ${sensi - 10}<br>
    🔍 Mira 2x: ${sensi - 20}<br>
    🔭 Mira 4x: ${sensi - 40}<br>
    🎯 Sniper: ${sensi - 80}<br>
    👁️ Olhadinha: ${sensi - 50}
  `;
}
