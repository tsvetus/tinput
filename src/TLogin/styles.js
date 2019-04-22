import {COLOR} from '../styles';

export default {

    container: {
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -80%)",
        display: "flex",
        flexDirection: "column",
        borderWidth: "1px 1px 1px 1px",
        borderStyle: "solid",
        borderColor: COLOR.BORDER,
        backgroundColor: COLOR.PANEL,
        maxWidth: "220px",
        padding: "24px 16px 16px 16px",
        alignItems: "center"
    },

    input: {
        margin: "0 16px 16px 16px"
    },

    button: {
        fontSize: "18px",
        maxWidth: "120px",
        margin: "8px"
    }

}
