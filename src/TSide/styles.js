import {COLOR} from '../styles';

export default {

    container: {
        height: "100%",
        width: "0",
        position: "fixed",
        zIndex: "1",
        top: "0",
        left: "0",
        backgroundColor: COLOR.MENU,
        overflowX: "hidden",
        transition: "0.5s",
        paddingTop: "60px"
    },

    close: {
        display: "block",
        position: "absolute",
        top: "0",
        right: "25px",
        fontSize: "36px",
        fontWeight: "bold",
        marginLeft: "50px",
        cursor: "pointer",
        padding: "8px 8px 8px 32px",
        textDecoration: "none",
        color: COLOR.TEXT,
        transition: "0.3s"
    },

    item: {
        padding: "8px 8px 8px 32px",
        textDecoration: "none",
        fontSize: "25px",
        color: COLOR.TEXT,
        display: "block",
        transition: "0.3s",
        cursor: "pointer"
    }

}
