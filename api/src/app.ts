import express from "express";
import cors from "cors";
import createHttpError from "http-errors";
import router from "./routes";

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

// Error handler
app.use((req, res, next) => {
  next(createHttpError(404));
});

app.use(
  (
    err: any,
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    res.status(err.status || 500);
    res.json({
      error: {
        status: err.status || 500,
        message: err.message,
      },
    });
  }
);

export default app;
