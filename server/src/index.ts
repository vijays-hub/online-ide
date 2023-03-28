import app from "server";

const PORT = process.env.PORT || 8080;

const main = () => {
  app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
  });
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
process.on("unhandledRejection", (reason: any) => {
  console.error("Unhandled Rejection at: ", (reason && reason.stack) || reason);
});

main();
