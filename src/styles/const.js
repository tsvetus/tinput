import defaultLayout from './layout.js';
import defaultStyles from './styles.js';
import defaultTemplates from './template.js';

import {merge} from '../util';

const styles = merge(defaultLayout, defaultStyles(defaultTemplates));

function registerStyles(customStyles, customTemplates) {
    let templates = defaultTemplates;
    if (customTemplates && customTemplates instanceof Object) {
        templates = merge(defaultTemplates, customTemplates);
    }
    Object.assign(styles, merge(defaultLayout, defaultStyles(templates)));
    if (customStyles && customStyles instanceof Object) {
        Object.assign(styles, merge(styles, customStyles));
    }
}

export {
    styles,
    registerStyles
}