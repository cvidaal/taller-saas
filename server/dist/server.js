"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const envs_1 = require("./config/envs");
async function main() {
    app_1.app.listen(envs_1.envs.PORT, () => {
        console.log(`Server running on port ${envs_1.envs.PORT}`);
        console.log(`http://localhost:${envs_1.envs.PORT}/api/v1/users`);
    });
}
main();
//# sourceMappingURL=server.js.map