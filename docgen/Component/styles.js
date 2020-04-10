import {styles} from 'tinput';

export default {

    container: {
        maxWidth: "1024px",
        margin: "auto"
    },

    name: {
        margin: "0 0 0 0",
        ...styles.fonts.common,
        color: styles.colors.border,
        fontSize: "36px"
    },

    desc: {
        margin: "16px 0 0 0",
        ...styles.fonts.common,
        color: styles.colors.border,
        fontSize: "24px"
    },

    props: {
        margin: "16px 0 0 0",
        ...styles.fonts.common,
        color: styles.colors.border,
        fontSize: "18px"
    },

    example: {
        margin: "16px 0 0 0",
        ...styles.fonts.common,
        color: styles.colors.border,
        fontSize: "18px"
    },

    box: {
        border: "1px solid " + styles.colors.border
    },

    code: {
        backgroundColor: "#eee",
        color: "#90167f",
        padding: "8px",
        fontSize: "16px",
        overflowX: "scroll"
    }

}