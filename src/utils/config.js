let debug = false;

let config = {
    logo:'http://img.mabylove.cn/rootImg/logo/logoP100.png',
    name: '文件服务中心',
    host: 'http://api.file.mabylove.cn'
};

if (debug) {
    config.host = 'http://localhost:8089';
}

export default config;