import server from "./src/server";

const PORT = 3001;

server.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
