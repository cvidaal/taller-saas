import { app } from "./app";
import { envs } from "./config/envs";

async function main() {
  app.listen(envs.PORT, () => {
    console.log(`Server running on port ${envs.PORT}`);
    console.log(`http://localhost:${envs.PORT}/api/v1/users`);
  });
}

main();
