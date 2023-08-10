"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("../config");
const config_2 = require("@nestjs/config");
const express_1 = require("express");
const cors = require("cors");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_2.ConfigService);
    const port = configService.get('app.port');
    app.setGlobalPrefix(configService.get('app.global_url_prefix'));
    app.use((0, express_1.json)({ limit: '50mb' }));
    app.use((0, express_1.urlencoded)({ limit: '50mb', extended: true }));
    app.use(cors({ origin: (0, config_1.default)().cors.origin, methods: (0, config_1.default)().cors.methods }));
    await app.listen(port, () => {
        console.log(`Listening at port ${port}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map