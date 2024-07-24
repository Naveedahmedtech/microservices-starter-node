import express from "express";
import proxy from "express-http-proxy";
import { config } from "dotenv";

config();

// TODO: handle case where PORT not found

const app = express();

const PORT = process.env.PORT;

const AUTH_ROUTE = process.env.AUTH_ROUTE;
const AUTH_PORT = process.env.AUTH_PORT;
const EMAIL_PORT = process.env.EMAIL_PORT;
const EMAIL_ROUTE = process.env.EMAIL_ROUTE;

app.use(`/${AUTH_ROUTE}`, proxy(`http://localhost:${AUTH_PORT}`));
app.use(`/${EMAIL_ROUTE}`, proxy(`http://localhost:${EMAIL_PORT}`));

app.listen(PORT, () => {
  console.log(`SERVER IS LISTING ON ${PORT}`);
});
