import {COLOR, FONT, INPUT} from '../styles';

export default {

    container: {
        display: "flex",
        flexDirection: "column",
        padding: "0"
    },

    box: {
        display: "flex",
        flex: "1"
    },

    edit: {
        flex: "1",
        border: "2px solid " + COLOR.BORDER,
        margin: "0",
        resize: "none",
        ...FONT.TEXT
    },

    label: {
        ...INPUT.TEXTLABEL
    }

}
