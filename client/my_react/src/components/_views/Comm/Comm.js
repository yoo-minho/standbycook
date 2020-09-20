const Comm = function() {

    return {
        coalesce:coalesce,
    }

    function coalesce(val, defaultVal){
        let tmpVal;
        if(val == null || val == undefined || val == ''){
            if(defaultVal == null || defaultVal == undefined || defaultVal == ''){
                tmpVal = '';
            } else {
                tmpVal = defaultVal;
            }
        } else {
            tmpVal = val;
        }
        return tmpVal;
    }
}()

export default Comm;