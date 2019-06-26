import {COLOR, SIZE, DEBUG, FONT} from './consts.js';

export const INPUT = {

    CONTAINER: {
        ...DEBUG,
        display: "flex",
        justifyContent: "flex-start",
        borderBottom: "2px solid " + COLOR.BORDER,
        height: SIZE.EDIT_HEIGHT,
        backgroundColor: "transparent"
    },

    LABEL: {
        ...DEBUG,
        fontWeight: "normal",
        fontFamily: FONT.LABEL.FAMILY,
        fontSize: FONT.LABEL.SIZE,
        alignSelf: "flex-end",
        padding: "0",
        margin: "0 4px 0 0",
        flexGrow: 0,
        flexShrink: 0,
        color: COLOR.BORDER
    },

    TEXTLABEL: {
        ...DEBUG,
        fontWeight: "normal",
        fontFamily: FONT.LABEL.FAMILY,
        fontSize: FONT.LABEL.SIZE,
        padding: "0",
        margin: "0",
        color: COLOR.BORDER
    },

    EDIT: {
        ...DEBUG,
        fontWeight: "normal",
        fontFamily: FONT.EDIT.FAMILY,
        fontSize: FONT.EDIT.SIZE,
        alignSelf: "flex-end",
        padding: "0",
        margin: "0 0 0 0",
        width: "100%",
        color: COLOR.TEXT,
        outline: "none",
        border: "none",
        backgroundColor: "transparent"
    },

    LIST: {
        ...DEBUG,
        display: "flex",
        flexDirection: "column",
        position: "fixed",
        overlay: "0",
        backgroundColor: "#ffffff",
        margin: "0",
        padding: "0"
    },

    ITEM: {
        ...DEBUG,
//        fontWeight: "normal",
        fontFamily: FONT.EDIT.FAMILY,
        fontSize: FONT.EDIT.SIZE,
        margin: "0",
        color: COLOR.TEXT,
        padding: "4px",
        cursor: "pointer",
        border: "1px solid " + COLOR.BORDER,
        backgroundColor: "#fff"
    }

}
