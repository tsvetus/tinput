import {styles} from 'tinput';

export default {

    top: {
        padding: "16px",
        flexWrap: "wrap"
    },

    box: {
        display: "flex"
    },

    menu: {
        container: {
            flex: "0 0 220px",
            backgroundColor: styles.colors.face,
            borderRight: "1px solid " + styles.colors.frame
        },
        frame: {
            paddingTop: "8px"
        }
    },

    scroll: {
        container: {
            width: "100%"
        },
        content: {
            padding: "32px 8px 0 8px",
            borderTop: "1px solid " + styles.colors.frame
        }
    },

    readme: {
        ...styles.fonts.common,
        color: styles.colors.border,
        textAlign: "center"
    }
}