import defaultLayout from './layout.js';
import defaultStyles from './styles.js';
import defaultTemplates from './templates.js';
import defaultIcons from './icons.js';

import {merge} from '../util';

const templates = defaultTemplates;
const styles = defaultLayout;
const icons = defaultIcons;

Object.assign(styles, merge(styles, defaultStyles(templates)));

function registerTemplates(customTemplates) {
    if (customTemplates && customTemplates instanceof Object) {
        Object.assign(templates, merge(templates, customTemplates));
    }
}

function registerIcons(customIcons) {
    if (customIcons && customIcons instanceof Object) {
        Object.assign(icons, merge(icons, customIcons));
    }
}

function registerStyles(customStyles, customTemplates, customIcons) {
    registerTemplates(customTemplates);
    Object.assign(styles, merge(styles, defaultStyles(templates)));
    if (customStyles && customStyles instanceof Object) {
        Object.assign(styles, merge(styles, customStyles));
    }
}

function register(object) {
    if (object) {
        registerStyles(object.styles, object.templates, object.icons);
    }
}

export {
    styles,
    templates,
    icons,
    registerStyles,
    register
}