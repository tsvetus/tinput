import {templates} from 'tinput';

export default {

    top: {
        padding: "16px",
        flexWrap: "wrap",
        borderBottom: "1px solid " + templates.colors.frame
    },

    box: {
        display: "flex"
    },

    menu: {
        container: {
            flex: "0 0 260px",
            backgroundColor: templates.colors.face,
            borderRight: "1px solid " + templates.colors.frame
        },
        content: {
            paddingTop: "8px"
        }
    },

    scroll: {
        container: {
            width: "100%"
        },
        content: {
            padding: "32px 8px 0 8px"
        }
    },

    readme: {
        ...templates.fonts.common,
        color: templates.colors.border,
        textAlign: "center"
    }
}