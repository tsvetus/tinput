import {COLOR} from '../styles';

export default {

    /* Modal */
    modal: {
        display: "block", /* Hidden by default */
        position: "fixed", /* Stay in place */
        zindex: "1", /* Sit on top */
        left: "0",
        top: "0",
        width: "100%", /* Full width */
        height: "100%", /* Full height */
        overflow: "auto", /* Enable scroll if needed */
        backgroundColor: "rgb(0,0,0)", /* Fallback color */
        backgroundColor: "rgba(0,0,0,0.4)", /* Black w/ opacity */
        backdrop: "static",
        keyboard: "false",
        transitionProperty: "width",
        transitionDuration: "4s",
        transitionDelay: "2s"
    },

    /* Modal Container */
    container: {
        backgroundColor: COLOR.WINDOW,
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        borderWidth: "1px 1px 1px 1px",
        borderStyle: "solid",
        borderColor: COLOR.BORDER,
        maxWidth: "600px",
        width: "55%",
        cursor: "default"
    },

    header: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "nowrap",
        margin: "16px"
    },

    /* The Close Button */
    close: {
        color: "#aaaaaa",
        fontSize: "24px",
        fontWeight: "bold",
        cursor: "pointer"
    },

    timer: {
        color: "#ff5555",
        fontSize: "24px",
        fontWeight: "bold"
    },

    caption: {
        color: "#000000",
        fontSize: "22px",
        fontWeight: "bold",
        textAlign: "center",
        margin: "0 8px 0 8px"
    },

    content: {
        margin: "8px"//,
//        border: "1px solid #dddddd"
    }

}
