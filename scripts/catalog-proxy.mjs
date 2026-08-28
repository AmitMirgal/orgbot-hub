import http from "node:http";

const upstreamPort = Number(process.env.PGRST_UPSTREAM_PORT ?? 54324);
const listenPort = Number(process.env.CATALOG_PROXY_PORT ?? 54321);

const server = http.createServer((req, res) => {
  const url = req.url ?? "/";
  if (url.startsWith("/auth/v1")) {
    res.writeHead(501, { "content-type": "application/json" });
    res.end(
      JSON.stringify({
        error: "GitHub auth needs `supabase start` with OAuth secrets.",
      })
    );
    return;
  }

  const path = url.startsWith("/rest/v1")
    ? url.slice("/rest/v1".length) || "/"
    : url;

  const headers = { ...req.headers, host: `127.0.0.1:${upstreamPort}` };
  const proxy = http.request(
    {
      hostname: "127.0.0.1",
      port: upstreamPort,
      path,
      method: req.method,
      headers,
    },
    (upstream) => {
      res.writeHead(upstream.statusCode ?? 502, upstream.headers);
      upstream.pipe(res);
    }
  );
  proxy.on("error", () => {
    res.writeHead(502, { "content-type": "application/json" });
    res.end(JSON.stringify({ error: "Catalog API is down." }));
  });
  req.pipe(proxy);
});

server.listen(listenPort, "127.0.0.1", () => {
  console.log(`catalog proxy http://127.0.0.1:${listenPort} -> :${upstreamPort}`);
});
