import express from "express";
import routes from "./routes/index.mjs";

const app = express();
app.use("/api", routes);
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

//udji cjbq vsfi mqwv
