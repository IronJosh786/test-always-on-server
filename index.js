const http = require("http");
const https = require("https");

const server = http.createServer((req, res) => {
  if (req.url === "/healthcheck") {
    res.writeHead(200, { "Content-Type": "application/json" });
    const response = JSON.stringify({
      status: 200,
      message: "Server is active!",
    });
    res.end(response);
  } else {
    res.end("hello from the server");
  }
});

const options = {
  hostname: "api.freeapi.app",
  path: "/api/v1/healthcheck",
  method: "GET",
  headers: {
    Accept: "application/json",
  },
};

const makeRequest = () => {
  const req = https.request(options, (res) => {
    let body = "";

    res.on("data", (chunk) => {
      body += chunk;
    });

    res.on("end", () => {
      console.log("Status:", JSON.parse(body).statusCode);
    });
  });

  req.on("error", (error) => {
    console.error("Error:", error);
  });

  req.end();
};

server.listen(3000, () => {
  setInterval(() => {
    makeRequest();
  }, 840000);
});
