"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const config_1 = require("@nestjs/config");
const express_1 = require("express");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    const port = configService.get('app.port');
    app.setGlobalPrefix(configService.get('app.global_url_prefix'));
    app.use((0, express_1.json)({ limit: '50mb' }));
    app.use((0, express_1.urlencoded)({ limit: '50mb', extended: true }));
    app.enableCors({
        origin: configService.get('cors.origin'),
        methods: configService.get('cors.methods'),
    });
    await app.listen(port, () => {
        console.log(`Listening at port ${port}`);
    });
}
bootstrap();
//# sourceMappingURL=main.js.map