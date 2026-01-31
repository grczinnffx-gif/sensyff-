let devices = {};

// Carrega base de celulares
fetch("devices.json")
  .then(response => response.json())
  .then(data => {
    devices = data;
    carregarMarcas();
  });

// Splash screen
setTimeout(() => {
  document.getElementById("splash").style.display = "none";
  document.getElementById("app").classList.remove("hidden");
}, 2000);

function carregarMarcas() {
  const marca = document.getElementById("marca");
  marca.innerHTML = `<option>Não sei</option>`;

  Object.keys(devices).forEach(m => {
    marca.innerHTML += `<option>${m}</option>`;
  });

  carregarModelos();
}

function carregarModelos() {
  const marca = document.getElementById("marca").value;
  const modelo = document.getElementById("modelo");

  modelo.innerHTML = `<option>Não encontrei meu modelo</option>`;

  if (devices[marca]) {
    Object.keys(devices[marca]).forEach(m => {
      modelo.innerHTML += `<option>${m}</option>`;
    });
  }
}

function gerar() {
  const estilo = Number(document.getElementById("estilo").value);
  const hz = Number(document.getElementById("hz").value);
  const marca = document.getElementById("marca").value;
  const modelo = document.getElementById("modelo").value;

  let sensi = estilo + hz;

  if (devices[marca] && devices[marca][modelo]) {
    const d = devices[marca][modelo];

    if (d.dpi > 480) sensi -= 5;
    else sensi += 5;

    if (d.tela >= 6.8) sensi += 10;
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
