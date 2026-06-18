import express from "express";
import type { Express } from "express";
import cookieParser from "cookie-parser";
import productRouter from "./routes/product.route.js";
import userRouter from "./routes/user.route.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Health check route
app.get("/", (_req, res) => {
  res.send("Server running perfectly");
});

// REVIEW FIX: Routes belong in app.ts not server.ts — keeps entry point clean
app.use("/api/auth", userRouter);
app.use("/api/products", productRouter);

// Global error handler must be registered last
app.use(errorMiddleware);

export default app;

