import {COLOR, FONT} from '../styles';

export default {

    container: {
        textAlign: "center"
    },

    error: {
        ...FONT.ERROR,
        margin: "16px",
        color: COLOR.ERROR
    },

    message: {
        ...FONT.MESSAGE,
        margin: "16px",
        color: COLOR.MESSAGE
    }

}
