import express from "express";

const main = () => {
  const app = express();

  const PORT = process.env.PORT || 8080;

  app.get("/", (req, res) => {
    res.status(200).json({ msg: "BRAND NEW SHIZZZ!" });
  });

  app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`);
  });
};

main();
