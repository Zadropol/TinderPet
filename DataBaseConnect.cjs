require("dotenv").config();
const http = require("http");
const { neon } = require("@neondatabase/serverless");
const sql = neon(process.env.DATABASE_URL);

async function leerBody(req) {
  return new Promise((resolve) => {
    let data = "";
    req.on("data", (chunk) => (data += chunk));
    req.on("end", () => resolve(JSON.parse(data || "{}")));
  });
}

const server = http.createServer(async (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    res.writeHead(200);
    res.end();
    return;
  }

  // GET - obtener perfiles
  if (req.method === "GET" && req.url === "/perfiles") {
    const perfiles = await sql`SELECT * FROM mascotas`;
    res.end(JSON.stringify(perfiles));
    return;
  }

  // POST - crear perfil
  if (req.method === "POST" && req.url === "/perfiles") {
    const body = await leerBody(req);

    const result = await sql`
      INSERT INTO mascotas (nombre, edad, raza, imagen, especie, sexo, vacunas)
      VALUES (${body.nombre}, ${body.edad}, ${body.raza}, ${body.imagen},
              ${body.especie}, ${body.sexo}, ${body.vacunas})
      RETURNING *
    `;

    res.end(JSON.stringify({ ok: true, perfil: result[0] }));
    return;
  }

  res.writeHead(404);
  res.end(JSON.stringify({ error: "Not found" }));
});

server.listen(3000, () =>
  console.log("API funcionando en http://localhost:3000")
);
