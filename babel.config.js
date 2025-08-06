export default function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo'],
        plugins: [
            ['module:react-native-dotenv', {
                moduleName: '@env',
                path: '.env',
                blocklist: null,
                allowlist: null,
                safe: false,
                allowUndefined: true,
            }]
        ]
    };
};

// plugins: [
//   ["module:react-native-dotenv", {
//     "moduleName": "@env",
//     "path": ".env",
//     "safe": false,
//     "allowUndefined": false
//   }]
// ]
