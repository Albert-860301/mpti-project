import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = fileURLToPath(new URL(".", import.meta.url));

const saveDataPlugin = {
  name: "save-data-api",
  configureServer(server) {
    server.middlewares.use("/api/save-data", (req, res) => {
      if (req.method !== "POST") { res.statusCode = 405; res.end(); return; }
      let body = "";
      req.on("data", chunk => { body += chunk; });
      req.on("end", () => {
        try {
          const data = JSON.parse(body);
          const dir = path.resolve(__dirname, "public/data");
          fs.mkdirSync(dir, { recursive: true });
          fs.writeFileSync(path.join(dir, "store.json"), JSON.stringify(data, null, 2));
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ ok: true }));
        } catch (e) {
          res.statusCode = 500;
          res.end(JSON.stringify({ ok: false, error: e.message }));
        }
      });
    });
  },
};

const saveImagePlugin = {
  name: "save-image-api",
  configureServer(server) {
    server.middlewares.use("/api/save-image", (req, res) => {
      if (req.method !== "POST") { res.statusCode = 405; res.end(); return; }
      let body = "";
      req.on("data", chunk => { body += chunk; });
      req.on("end", () => {
        try {
          const { folder, filename, dataUrl } = JSON.parse(body);
          const dir = path.resolve(__dirname, "public/images", folder);
          fs.mkdirSync(dir, { recursive: true });
          const base64 = dataUrl.replace(/^data:image\/\w+;base64,/, "");
          fs.writeFileSync(path.join(dir, filename), Buffer.from(base64, "base64"));
          const url = `/images/${folder}/${filename}`;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ ok: true, url }));
        } catch (e) {
          res.statusCode = 500;
          res.end(JSON.stringify({ ok: false, error: e.message }));
        }
      });
    });
  },
};

export default defineConfig({
  plugins: [react(), saveDataPlugin, saveImagePlugin],
  server: {
    port: 3000,
    host: true,
  },
});
