export default {

    colors: {
        border: "rgba(42,41,117,0.89)",
        face: "#eee",
        frame: "#bfbbff",
        shadow: "#ddd",
        control: "#777",
        placeholder: "#777",
        text: "#000",
        invalid: "#a31",
        window: "#fff",
        panel: "#eee",
        error: "#a31",
        message: "#31a",
        signal: "#f55",
        indicator: "#a31"
    },

    fonts: {
        common: {
            fontFamily: "Arial",
            fontSize: "18px"
        },
        small: {
            fontFamily: "Arial",
            fontSize: "16px"
        },
        code: {
            fontFamily: "Helvetica",
            fontSize: "16px"
        }
    },

    months: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Now', 'Dec'],

    days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],

    formats: {
        date: {mask: 'DD.MM.YYYY', empty: '_', full: true, type: 'iso'},
        time: {mask: 'hh:mm', empty: '_', full: true, type: 'iso'}
    }

}