let path = require('path');
let fs = require('fs');
let docs = require('react-docgen');

let config = require(path.resolve(process.cwd(), 'docgen.config.js'));

function structure(source) {
    let result = {};
    if (Array.isArray(source)) {
        source.forEach(v => {
            result[v.value ? v.value : v.name] = {
                description: v.description
            }
        });
    } else if (source.name === 'shape') {
        return structure(source.value);
    } else {
        for (let key in source) {
            let obj = source[key];
            result[key] = {
                type: obj.name,
                description: obj.description
            };
            if (obj.value) {
                if (obj.name === 'shape') {
                    result[key].structure = structure(obj.value);
                } else if (obj.name === 'enum') {
                    let val = obj.value.map(v => {
                        return v.value;
                    });
                    result[key].type += ' of [' + val.join(', ') + ']';
                }
            }
        }
    }
    return result;
}

function parseDescription(source) {
    if (source && source.indexOf('@param') >= 0) {
        let lines = source
            .replace(/\r/gm, '')
            .replace(/\n/gm, ' ').split('@param');
        let result = {
            description: lines[0],
            arguments: {}
        };
        lines.forEach((v, i) => {
            if (i > 0) {
                let w = v.trim().replace(/\r/gm, '').replace(/\n/gm, ' ');
                let words = w.split(' ');
                let type = words.shift();
                type = type.replace('{', '').replace('}', '');
                let name = words.shift();
                let description = words.join(' ');
                result.arguments[name] = {
                    name: name,
                    type: type,
                    description: description
                };
            }
        });
        return result;
    } else {
        return {description: source};
    }
}

function refactor(source) {

    let result = {
        description: source.description,
        displayName: source.displayName,
        methods: source.methods,
        example: source.example
    };

    if (source.props) {
        let props = {};
        for (let key in source.props) {
            let prop = source.props[key];
            let desc = parseDescription(prop.description);
            props[key] = {
                type: prop.type ? prop.type.name : prop.name,
                description: desc.description,
                arguments: desc.arguments,
                required: prop.required,
                defaultValue: prop.defaultValue ? prop.defaultValue.value : undefined
            };
            if (prop.type && prop.type.value) {
                // if (props[key].type === 'arrayOf') {
                //     console.log(prop.type.value);
                // }
                props[key].structure = structure(prop.type.value);
            }
        }
        result.props = props;
    }

    return result;

}

function run() {

    let inputPath = config && config.input && config.input.path ?
        path.resolve(process.cwd(), config.input.path) : process.cwd();
    console.log('Input path: ' + inputPath);

    let outputPath = config && config.output && config.output.path ?
        path.resolve(process.cwd(), config.output.path) : process.cwd();
    console.log('Output path: ' + outputPath);

    let data = {
        name: config.name,
        title: config.title,
        components: {}
    };

    console.log('Start processing components:');

    let count = 0;
    if (config && config.components && config.components instanceof Array) {
        config.components.forEach((v) => {
            let compName = v.name;
            let compPath = path.resolve(inputPath, compName, compName + '.jsx');
            if (fs.existsSync(compPath)) {
                let compSource = fs.readFileSync(compPath, 'utf8');
                let compInfo = docs.parse(compSource);
                if (compInfo) {
                    compInfo = refactor(compInfo);
                    data.components[compName] = compInfo;
                    data.components[compName].example = v.example ? v.example : {};
                    if (v.example && v.example.name) {
                        let examPath = path.resolve(inputPath, compName, v.example.name + '.jsx');
                        let examSrc = fs.readFileSync(examPath, 'utf8');
                        if (examSrc) {
                            examSrc = examSrc.replace(/\r/gm, '')
                                .replace(/</gm, '&lt;')
                                .replace(/>/gm, '&gt;');
                            let html = '<pre><code>' + examSrc + '</code></pre>';
                            let examOut = path.resolve(outputPath, 'components', compName + '.html');
                            fs.writeFileSync(examOut, html,  'utf8');
                        }
                    }
                    console.log('    ' + compName);
                    count++;
                }
            } else {
                console.log('    ' + compName);
                data.components[compName] = {
                    displayName: compName
                };
            }
        });
        let docPath = path.resolve(outputPath, 'index.json');
        fs.writeFileSync(docPath, JSON.stringify(data, null, 2),  'utf8');
    }

    if (count > 0) {
        console.log('Job completed!');
    } else {
        console.log('Components not found!');
    }

}

run();