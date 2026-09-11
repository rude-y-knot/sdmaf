import express from "express";
import path from "path";
import fs from "fs";
import { fileURLToPath } from "url";
import multer from "multer";
import { createServer as createViteServer } from "vite";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Ensure uploads directory exists
const uploadsDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// Multer Storage Configuration for CAD & project drawings
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (_req, file, cb) => {
    // Generate safe timestamped filename preserving original Russian or English name
    const timestamp = Date.now();
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    // Sanitize filename: replace dangerous chars, keep letters/numbers/dots/dashes/underscores
    const originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');
    const safeName = originalName
      .replace(/[\/\?<>\\:\*\|"]/g, '_')
      .replace(/\s+/g, '_');
    
    cb(null, `${timestamp}_${randomSuffix}_${safeName}`);
  }
});

const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100 MB max for heavy CAD/3D STEP/DWG files
  }
});

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// Static serving for uploaded files so managers in Bitrix24 can download via direct URL
app.use("/uploads", express.static(uploadsDir, {
  setHeaders: (res, filePath) => {
    // Enable direct download and browser viewing
    const ext = path.extname(filePath).toLowerCase();
    if (ext === '.dxf' || ext === '.dwg' || ext === '.step' || ext === '.stp' || ext === '.igs') {
      res.setHeader('Content-Type', 'application/octet-stream');
    }
    res.setHeader('Access-Control-Allow-Origin', '*');
  }
}));

// API Routes
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// File upload endpoint: accepts multiple or single files (field 'files' or 'file')
app.post("/api/upload", upload.any(), (req, res) => {
  try {
    const files = req.files as Express.Multer.File[] | undefined;
    if (!files || files.length === 0) {
      return res.status(400).json({ error: "No files uploaded" });
    }

    const host = req.get("host") || `localhost:${PORT}`;
    const protocol = req.headers["x-forwarded-proto"] || req.protocol || "http";
    const baseUrl = `${protocol}://${host}`;

    const uploadedResults = files.map((file) => {
      // Decode original name properly if needed
      let originalName = file.originalname;
      try {
        originalName = Buffer.from(file.originalname, 'latin1').toString('utf8');
      } catch {
        // use default
      }

      const sizeMb = (file.size / (1024 * 1024)).toFixed(2);
      const sizeStr = file.size < 1024 * 1024 
        ? `${Math.round(file.size / 1024)} КБ` 
        : `${sizeMb} МБ`;

      return {
        originalName,
        fileName: file.filename,
        url: `${baseUrl}/uploads/${file.filename}`,
        relativeUrl: `/uploads/${file.filename}`,
        size: sizeStr,
        sizeBytes: file.size,
        mimeType: file.mimetype,
        uploadedAt: new Date().toISOString()
      };
    });

    res.json({
      success: true,
      count: uploadedResults.length,
      files: uploadedResults
    });
  } catch (error: any) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to process file upload", message: error?.message });
  }
});

// Proxy route for Bitrix24 to avoid browser CORS issues if webhook domain blocks direct browser POST
app.post("/api/bitrix-proxy", async (req, res) => {
  try {
    const { webhookUrl, payload } = req.body;
    if (!webhookUrl) {
      return res.status(400).json({ error: "webhookUrl is required" });
    }

    const b24Res = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await b24Res.json();
    res.json(data);
  } catch (error: any) {
    console.error("Bitrix proxy error:", error);
    res.status(500).json({ error: "Bitrix proxy request failed", message: error?.message });
  }
});

// Start Server with Vite or Static
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
}

startServer();
