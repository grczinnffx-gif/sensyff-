let devices = {};

// Splash SEMPRE some
setTimeout(() => {
  const splash = document.getElementById("splash");
  const app = document.getElementById("app");
  if (splash) splash.style.display = "none";
  if (app) app.classList.remove("hidden");
}, 1500);

// Carrega base com proteção
fetch("devices.json")
  .then(r => r.json())
  .then(data => {
    devices = data;
    if (document.getElementById("marca")) carregarMarcas();
  })
  .catch(() => {
    console.log("Erro ao carregar devices.json");
  });

function carregarMarcas() {
  const marca = document.getElementById("marca");
  if (!marca) return;

  marca.innerHTML = `<option value="">Selecione a marca</option>`;
  Object.keys(devices).forEach(m =>
    marca.innerHTML += `<option value="${m}">${m}</option>`
  );
}

function carregarCategorias() {
  const marca = document.getElementById("marca")?.value;
  const categoria = document.getElementById("categoria");
  if (!categoria || !devices[marca]) return;

  categoria.innerHTML = `<option value="">Selecione a categoria</option>`;
  Object.keys(devices[marca]).forEach(c =>
    categoria.innerHTML += `<option value="${c}">${c}</option>`
  );
}

function carregarLinhas() {
  const marca = document.getElementById("marca")?.value;
  const categoria = document.getElementById("categoria")?.value;
  const linha = document.getElementById("linha");
  if (!linha || !devices[marca]?.[categoria]) return;

  linha.innerHTML = `<option value="">Selecione a linha</option>`;
  Object.keys(devices[marca][categoria]).forEach(l =>
    linha.innerHTML += `<option value="${l}">${l}</option>`
  );
}

function gerar() {
  let sensi = Number(document.getElementById("estilo")?.value || 150);
  sensi += Number(document.getElementById("hz")?.value || 0);

  const dpiVal = document.getElementById("dpi")?.value || "auto";

  if (dpiVal !== "auto") {
    const dpi = Number(dpiVal);
    if (dpi > 480) sensi -= 5;
    else if (dpi < 350) sensi += 10;
    else sensi += 5;
  }

  sensi = Math.max(0, Math.min(200, sensi));

  const res = document.getElementById("resultado");
  if (res) {
    res.innerHTML = `
      🎯 <b>Geral:</b> ${sensi}<br><br>
      🔴 Red Dot: ${sensi - 10}<br>
      🔍 Mira 2x: ${sensi - 20}<br>
      🔭 Mira 4x: ${sensi - 40}<br>
      🎯 Sniper: ${sensi - 80}<br>
      👁️ Olhadinha: ${sensi - 50}
    `;
  }
}
