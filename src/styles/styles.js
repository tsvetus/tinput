import {COLOR, SIZE, DEBUG, FONT} from './consts.js';

export const INPUT = {

    MAIN_CONTAINER: {
        ...DEBUG,
        position: "relative",
        borderBottom: "2px solid " + COLOR.BORDER,
        height: SIZE.EDIT_HEIGHT,
        backgroundColor: "transparent",
        overflow: "visible",
        cursor: "pointer"
    },

    EDIT_CONTAINER: {
        ...DEBUG,
        position: "absolute",
        bottom: "0",
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        cursor: "pointer"
    },

    CONTAINER: {
        ...DEBUG,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "flex-end",
        borderBottom: "2px solid " + COLOR.BORDER,
        height: SIZE.EDIT_HEIGHT,
        backgroundColor: "transparent",
        overflow: "visible",
        cursor: "pointer"
    },

    LABEL: {
        ...DEBUG,
        fontWeight: "normal",
        fontFamily: FONT.LABEL.FAMILY,
        fontSize: FONT.LABEL.SIZE,
        padding: "0",
        margin: "0 4px 0 0",
        flex: "0 0 auto",
        color: COLOR.BORDER
    },

    TEXT_LABEL: {
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
        padding: "0",
        margin: "0 0 0 0",
        flex: "1 1 auto",
        width: "100%",
        color: COLOR.TEXT,
        outline: "none",
        border: "none",
        backgroundColor: "transparent"
    },

    LIST: {
        ...DEBUG,
        tabIndex: "0",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        overlay: "0",
        backgroundColor: "#ffffff",
        margin: "0",
        padding: "0"
    },

    ITEM: {
        ...DEBUG,
        fontFamily: FONT.EDIT.FAMILY,
        fontSize: FONT.EDIT.SIZE,
        margin: "0",
        color: COLOR.TEXT,
        padding: "8px",
        cursor: "pointer",
        border: "1px solid " + COLOR.BORDER,
        zIndex: "99",
        backgroundColor: "#fff",
        marginTop: "-1px"
    },

    ICON: {
        flex: "0 0 auto",
        width: "18px",
        marginLeft: "8px"
    }

};
