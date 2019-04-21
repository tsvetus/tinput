import {COLOR, FONT, INPUT} from '../styles';

export default {

    container: {
        display: "flex",
        flexDirection: "column",
        padding: "0"
    },

    box: {
        height: "100%"
    },

    edit: {
        border: "2px solid " + COLOR.BORDER,
        margin: "0",
        width: "calc(100% - 4px)",
        height: "100% !important",
        resize: "none",
        ...FONT.TEXT
    },

    label: {
        ...INPUT.TEXTLABEL
    }

}
