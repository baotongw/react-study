const utils = {
    log: function(data, status) {
        status && console.log(data)
    },
    logTitle: function(text) {
        console.log(`%c ${text}`, 'font-size:13px; color: red');
    }
}

export default utils