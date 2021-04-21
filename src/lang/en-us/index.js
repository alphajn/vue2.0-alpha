const langs = {};
const files = require.context('./', false, /\.json$/);

files.keys().forEach((filename) => {
    const key = filename.replace('.json', '').replace('./', '');
    langs[key] = files(filename);
});

export default langs;
