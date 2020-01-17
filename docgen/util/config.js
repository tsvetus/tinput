import path from 'path';
import fs from 'fs';

import {merge} from 'tinput';

const config = {
    output: {
        path: path.resolve(__dirname, './docs')
    }
};

export function readConfig(src) {
    let custom = null;
    let fileName = path.resolve(process.cwd(), 'tdocs.config.js');
    if (fileName) {
        fileName = fileName.replace(/\\/g, "/");
        fs.copyFile(fileName, '../cache', (err) => {});
        try {
            console.log('Try to read custom configuration from "' + fileName + '" ...');
            custom = require(process.cwd() + '\\tdocs.config.js');
            console.log('... SUCCESS!!!');
        } catch (e) {
            console.log('... FAILED with ' + JSON.stringify(e) + '!');
        }
    }
    if (custom) {
        return merge(config, custom);
    } else {
        return config;
    }
}