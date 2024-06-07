const common_site_config = require('../../../sites/common_site_config.json');
const { webserver_port } = common_site_config;

console.log("PROXY")
export default {
	'/salessheet/': {
        target: 'http://development.localhost:8000',
        rewrite: (path) => path.replace(/\/salessheet\/$/, '/salessheet'),
        changeOrigin: true,
        secure: false,
	},
};
