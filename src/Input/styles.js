import {COLOR, SIZE, DEBUG, FONT} from '../styles';

export default {

    container: {
        ...DEBUG,
        display: "flex",
        justifyContent: "flex-start",
        borderBottom: "2px solid " + COLOR.BORDER,
        height: SIZE.EDIT_HEIGHT,
        backgroundColor: "transparent"
    },

    label: {
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

    edit: {
        ...DEBUG,
        fontWeight: "normal",
        fontFamily: FONT.EDIT.FAMILY,
        fontSize: FONT.EDIT.SIZE,
        alignSelf: "flex-end",
        padding: "0",
        margin: "0 0 0 0",
        width: "100%",
        color: COLOR.TEXT
    }

}
