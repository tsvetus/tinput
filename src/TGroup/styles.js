import {COLOR, FONT, INPUT} from '../styles';

export default {

    container: {
        display: "flex",
        flexDirection: "column",
        padding: "0"
    },

    content: {
        display: "flex",
        flex: "1",
        border: "2px solid " + COLOR.BORDER
    },

    label: {
        ...INPUT.TEXTLABEL,
        display: "inline",
        marginLeft: "16px",
        marginBottom: "-8px",
        margin: "0 0 -8px 4px",
        padding: "0 4px 0 4px",
        backgroundColor: "#fff",
        opacity: "1",
        zIndex: "1",
        alignSelf: "flex-start"
    }

}
