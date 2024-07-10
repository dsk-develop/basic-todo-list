"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = app;
const common_1 = require("@angular/common");
const ssr_1 = require("@angular/ssr");
const express_1 = require("express");
const node_url_1 = require("node:url");
const node_path_1 = require("node:path");
const main_server_1 = require("./src/main.server");
function app() {
    const server = (0, express_1.default)();
    const serverDistFolder = (0, node_path_1.dirname)((0, node_url_1.fileURLToPath)(import.meta.url));
    const browserDistFolder = (0, node_path_1.resolve)(serverDistFolder, '../browser');
    const indexHtml = (0, node_path_1.join)(serverDistFolder, 'index.server.html');
    const commonEngine = new ssr_1.CommonEngine();
    server.set('view engine', 'html');
    server.set('views', browserDistFolder);
    server.get('**', express_1.default.static(browserDistFolder, {
        maxAge: '1y',
        index: 'index.html',
    }));
    server.get('**', (req, res, next) => {
        const { protocol, originalUrl, baseUrl, headers } = req;
        commonEngine
            .render({
            bootstrap: main_server_1.default,
            documentFilePath: indexHtml,
            url: `${protocol}://${headers.host}${originalUrl}`,
            publicPath: browserDistFolder,
            providers: [{ provide: common_1.APP_BASE_HREF, useValue: baseUrl }],
        })
            .then((html) => res.send(html))
            .catch((err) => next(err));
    });
    return server;
}
function run() {
    const port = process.env['PORT'] || 4000;
    const server = app();
    server.listen(port, () => {
        console.log(`Node Express server listening on http://localhost:${port}`);
    });
}
run();
//# sourceMappingURL=server.js.map