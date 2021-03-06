import {templates} from "tinput";

export default {

    container: {
        display: "flex",
        flexDirection: "column"
    },

    grid: {
        caption: {
            zIndex: "2"
        }
    },

    subGrid: {
        caption: {
            textAlign: "left",
            padding: '8px 8px 0 0'
        },
        cell: {
            padding: '8px 8px 0 0'
        }
    },

    name: {
        margin: "0 4px 0 0",
        color: "#f00",
        fontSize: "16px"
    },

    type: {
        margin: "0 4px 0 0",
        color: "rgba(0,126,0,0.86)",
        fontSize: "16px"
    },

    defaultValue: {
        margin: "0 4px 0 0 ",
        color: "#9c3573",
        fontSize: "16px"
    },

    required: {
        margin: "0 4px 0 0",
        color: "#009f00",
        fontSize: "16px"
    },

    description: {
        margin: "0 4px 0 0 ",
        color: templates.colors.border,
        fontSize: "16px"
    },

    desc: {
        margin: "0 4px 0 0 ",
        color: "#146238",
        fontSize: "16px"
    },

    row: {
        display: "flex"
    },

    box: {
        border: '1px solid ' + templates.colors.frame,
        padding: "8px",
        margin: "4px 0 4px 0",
        width: "100%"
    },

    top: {
        display: "flex",
        justifyContent: "flex-start",
        flexWrap: "wrap",
        fontWeight: "bold",
        padding: "0 0 8px 0"
    },

    text: {
        margin: "0 4px 0 0",
        color: templates.colors.border,
        fontSize: "16px",
        fontWeight: "normal",
        whiteSpace: "nowrap"
    },


}