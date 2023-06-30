const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 3001;
// when using middleware `hostname` and `port` must be provided below
const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(function () {
  createServer(async function (req, res) {
    try {
      // Be sure to pass `true` as the second argument to `url.parse`.
      // This tells it to parse the query portion of the URL.
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      if (pathname === "/adminstrator") {
        await app.render(req, res, "/adminstrator", query);
      } else if (pathname === "/calculator/:calculator") {
        await app.render(req, res, "/calculator/[calculator]", query);
      } else if (pathname === "/article") {
        await app.render(req, res, "/article", query);
      } else {
        await handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.error("Error occurred handling", req.url, err);
      res.statusCode = 500;
      res.end("internal server error");
    }
  })
    .once("error", function (err) {
      console.error(err);
      process.exit(1);
    })
    .listen(port, function () {
      console.log(`> Ready on http://${hostname}:${port}`);
    });
});
