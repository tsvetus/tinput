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
        top: "12px",
        right: "12px",
        color: COLOR.CONTROL,
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
    },

    touch: {
        position: "fixed",
        zIndex: 2,
        top: "0",
        left: "0",
        height: "100vh",
        width: "8px",
        opacity: "0"
    }

}
