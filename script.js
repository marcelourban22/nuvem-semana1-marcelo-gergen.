const statusEl = document.getElementById("status");
const clockEl = document.getElementById("clock");
const btn = document.getElementById("btn");
const apiEl = document.getElementById("api");
function tick() {
const now = new Date();
clockEl.textContent = now.toLocaleTimeString("pt-BR");
}
setInterval(tick, 1000);
tick();
statusEl.textContent = "Site carregado com sucesso. (Sem Node, sem instalacao.)";
btn.addEventListener("click", async () => {
apiEl.textContent = "Consultando API...";
try {
const resp = await fetch("https://api.agify.io?name=rafael");
if (!resp.ok) throw new Error("HTTP " + resp.status);
const data = await resp.json();
apiEl.textContent = JSON.stringify(data, null, 2);
} catch (err) {
apiEl.textContent = "Erro no fetch: " + err.message;
}
});
const out = document.getElementById("out");
const btnGet = document.getElementById("btnGet");
const btnPost = document.getElementById("btnPost");
function show(obj) {
out.textContent = typeof obj === "string" ? obj : JSON.stringify(obj, null, 2);
}
async function httpGetWeather() {
show("Buscando clima (GET)...");
try {
// Open-Meteo (sem chave). Exemplo: coordenadas aproximadas do Oeste do PR.
const url = "https://api.open-meteo.com/v1/forecast?latitude=-24.33&longitude=-53.85&current=temperature_2m,wind_speed_10m";
const resp = await fetch(url);
if (!resp.ok) throw new Error("HTTP " + resp.status);
const data = await resp.json();
show({
fonte: "open-meteo.com",
temperatura: data.current?.temperature_2m,
vento: data.current?.wind_speed_10m,
unidade_temp: data.current_units?.temperature_2m,
unidade_vento: data.current_units?.wind_speed_10m,
bruto: data
});
} catch (err) {
show("Erro no GET: " + err.message + "\nDica: veja F12 > Network/Console.");
}
}
async function httpPostSimulado() {
show("Enviando dados (POST simulado)...");
try {
const resp = await fetch("https://jsonplaceholder.typicode.com/posts", {
method: "POST",
headers: { "Content-Type": "application/json" },
body: JSON.stringify({
turma: "Serviços em Nuvem",
atividade: "Semana 2",
timestamp: new Date().toISOString()
})
});
if (!resp.ok) throw new Error("HTTP " + resp.status);
const data = await resp.json();
show({ fonte: "jsonplaceholder.typicode.com", resposta: data });
} catch (err) {
show("Erro no POST: " + err.message);
}


  
}

btnGet.addEventListener("click", httpGetWeather);
btnPost.addEventListener("click", httpPostSimulado);

// feito por IA 

// ─────────────────────────────────────────────────────────────
// SEMANA 1 — Relógio e status da página
// ─────────────────────────────────────────────────────────────

// Pega os elementos do HTML pelo id
const statusEl = document.getElementById("status");
const clockEl  = document.getElementById("clock");

// Função que atualiza o relógio com a hora atual
function tick() {
  clockEl.textContent = new Date().toLocaleTimeString("pt-BR");
}

// Chama tick() a cada 1000ms (1 segundo) para o relógio ficar vivo
setInterval(tick, 1000);
tick(); // chama uma vez imediatamente para não esperar 1s na primeira vez

// Atualiza o parágrafo de status assim que a página carrega
statusEl.textContent = "Site carregado com sucesso. (Sem Node, sem instalação.)";

// ─────────────────────────────────────────────────────────────
// SEMANA 1 — Teste de API pública (agify.io)
// ─────────────────────────────────────────────────────────────

const btn   = document.getElementById("btn");
const apiEl = document.getElementById("api");

btn.addEventListener("click", async () => {
  apiEl.textContent = "Consultando API...";
  try {
    // Faz uma requisição GET para a API agify com o nome "rafael"
    const resp = await fetch("https://api.agify.io?name=rafael");
    if (!resp.ok) throw new Error("HTTP " + resp.status);
    const data = await resp.json();
    // Exibe o JSON retornado formatado com 2 espaços de indentação
    apiEl.textContent = JSON.stringify(data, null, 2);
  } catch (err) {
    apiEl.textContent = "Erro no fetch: " + err.message;
  }
});

// ─────────────────────────────────────────────────────────────
// SEMANA 2 — GET clima fixo + POST simulado
// ─────────────────────────────────────────────────────────────

const out     = document.getElementById("out");
const btnGet  = document.getElementById("btnGet");
const btnPost = document.getElementById("btnPost");

// Função auxiliar: exibe qualquer coisa no <pre id="out">
function show(obj) {
  out.textContent = typeof obj === "string" ? obj : JSON.stringify(obj, null, 2);
}

// GET — busca clima usando coordenadas fixas (Oeste do PR)
async function httpGetWeather() {
  show("Buscando clima (GET)...");
  try {
    // URL da Open-Meteo com latitude e longitude fixas no código
    const url = "https://api.open-meteo.com/v1/forecast?latitude=-24.33&longitude=-53.85&current=temperature_2m,wind_speed_10m";
    const resp = await fetch(url);
    if (!resp.ok) throw new Error("HTTP " + resp.status);
    const data = await resp.json();
    show({
      fonte: "open-meteo.com",
      temperatura: data.current?.temperature_2m,   // ?. evita erro se "current" vier vazio
      vento: data.current?.wind_speed_10m,
      unidade_temp: data.current_units?.temperature_2m,
      unidade_vento: data.current_units?.wind_speed_10m,
      bruto: data,
    });
  } catch (err) {
    show("Erro no GET: " + err.message);
  }
}

// POST — envia dados para o JSONPlaceholder (API de testes)
async function httpPostSimulado() {
  show("Enviando dados (POST simulado)...");
  try {
    const resp = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" }, // avisa que o corpo é JSON
      body: JSON.stringify({                            // converte objeto JS → texto JSON
        turma: "Serviços em Nuvem",
        atividade: "Semana 2",
        timestamp: new Date().toISOString(),
      }),
    });
    if (!resp.ok) throw new Error("HTTP " + resp.status);
    const data = await resp.json();
    show({ fonte: "jsonplaceholder.typicode.com", resposta: data });
  } catch (err) {
    show("Erro no POST: " + err.message);
  }
}

btnGet.addEventListener("click", httpGetWeather);
btnPost.addEventListener("click", httpPostSimulado);

// ─────────────────────────────────────────────────────────────
// SEMANA 3 — Geocoding + Forecast + Cache com localStorage
// ─────────────────────────────────────────────────────────────

// Pega os elementos do HTML usados nesta seção
const cityEl  = document.getElementById("city");
const btnCity = document.getElementById("btnCity");
const cityOut = document.getElementById("cityOut");

// Função auxiliar: exibe resultado ou mensagem no <pre id="cityOut">
function showCity(obj) {
  cityOut.textContent = typeof obj === "string" ? obj : JSON.stringify(obj, null, 2);
}

// ── REQUISIÇÃO 1: Geocoding ──────────────────────────────────
// Recebe o nome de uma cidade e devolve { name, lat, lon, country }
async function geocodeCity(name) {
  // Monta a URL encodando o nome da cidade (espaços viram %20, etc.)
  const url =
    "https://geocoding-api.open-meteo.com/v1/search?name=" +
    encodeURIComponent(name) +   // encodeURIComponent garante URL válida
    "&count=1" +                 // só o 1º resultado (mais relevante)
    "&language=pt" +             // nomes em português quando disponível
    "&format=json";

  const resp = await fetch(url);

  // Se o servidor retornou erro (ex: 404, 500), lança exceção
  if (!resp.ok) throw new Error("HTTP " + resp.status);

  const data = await resp.json(); // converte resposta para objeto JS

  // Pega o primeiro resultado do array "results"
  const first = data.results && data.results[0];

  // Se não veio nenhum resultado, a cidade não foi encontrada
  if (!first) throw new Error("Cidade não encontrada");

  // Retorna só os campos que vamos usar na próxima requisição
  return {
    name: first.name,
    lat: first.latitude,
    lon: first.longitude,
    country: first.country,
  };
}

// ── REQUISIÇÃO 2: Forecast ───────────────────────────────────
// Recebe lat e lon (vindos do geocoding) e devolve o clima atual
async function fetchWeather(lat, lon) {
  // Usa as coordenadas retornadas pela Req. 1 para montar a URL
  const url =
    "https://api.open-meteo.com/v1/forecast?" +
    "latitude=" + lat +
    "&longitude=" + lon +
    "&current=temperature_2m,wind_speed_10m"; // campos que queremos

  const resp = await fetch(url);
  if (!resp.ok) throw new Error("HTTP " + resp.status);

  return await resp.json(); // retorna o objeto completo do clima
}

// ── Evento do botão "Buscar clima" ───────────────────────────
btnCity.addEventListener("click", async function () {

  // Lê o valor do input e remove espaços extras nas bordas
  const city = (cityEl.value || "").trim();

  // Validação: se o campo estiver vazio, avisa e para por aqui
  if (!city) return showCity("Digite uma cidade.");

  showCity("Buscando..."); // feedback imediato para o usuário

  try {
    // Salva a cidade no localStorage ANTES de buscar
    // → se der erro, o campo ainda ficará preenchido na próxima vez
    localStorage.setItem("lastCity", city);

    // ── Req. 1: converte nome → coordenadas ──
    const geo = await geocodeCity(city);
    // geo = { name: "Curitiba", lat: -25.42, lon: -49.27, country: "Brazil" }

    // ── Req. 2: usa as coordenadas para buscar o clima ──
    const meteo = await fetchWeather(geo.lat, geo.lon);
    // meteo = { current: { temperature_2m: 18.5, wind_speed_10m: 12 }, ... }

    // Exibe o resultado formatado no <pre>
    showCity({
      cidade: geo.name,
      pais: geo.country,
      temperatura: meteo.current?.temperature_2m,
      vento: meteo.current?.wind_speed_10m,
      unidades: meteo.current_units, // ex: { temperature_2m: "°C", wind_speed_10m: "km/h" }
    });

  } catch (err) {
    // Se qualquer fetch falhar, exibe a mensagem de erro
    showCity("Erro: " + err.message);
  }
});

// ── Cache: preenche o campo ao abrir a página ────────────────
// Lê a última cidade salva no localStorage
const last = localStorage.getItem("lastCity");

// Se existir, coloca no campo de texto automaticamente
if (last) cityEl.value = last;
