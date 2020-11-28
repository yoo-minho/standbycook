const common = function() {
  
  return {
    json2query,
  };

  function json2query(dataJson){
      let tmpQuery = "";
      const tmpTableName = dataJson.tableName;
      const tmpColumns = dataJson.column && dataJson.column.join(',\n');
      const tmpValues = dataJson.value && dataJson.value.join(',\n');
      const tmpWheres = dataJson.where && dataJson.where.join(' \n');
      let tmpColumnAndValues = "";
      if(dataJson.column && dataJson.value && dataJson.column.length == dataJson.value.length){
          dataJson.column.forEach(function(v,i){
              tmpColumnAndValues += '\n' + dataJson.column[i] + ' = ' + dataJson.value[i];
              tmpColumnAndValues += ((dataJson.column.length-1 == i) ? '' : ',');
          })
      } else {
          //pass
      }

      if("INSERT" === dataJson.mode ){
          tmpQuery = `INSERT INTO ${tmpTableName} \n(${tmpColumns}) \nVALUES (${tmpValues}) \nRETURNING *;`;
      } else if ( "INSERT-SELECT" === dataJson.mode ){
          tmpQuery = `INSERT INTO ${tmpTableName} \n(${tmpColumns}) \nSELECT ${tmpValues} \nFROM (${dataJson.dummy}) dummy \nWHERE 1=1 ${tmpWheres} \nRETURNING *;`;
      } else if ( "SELECT" === dataJson.mode ){
          tmpQuery = `SELECT ${tmpColumns} \nFROM ${tmpTableName} \nWHERE 1=1 ${tmpWheres};`;
      } else if ( "SUBQUERY" === dataJson.mode ){
          tmpQuery = `(SELECT ${tmpColumns} \nFROM ${tmpTableName} \nWHERE 1=1 ${tmpWheres})`;
      } else if ( "UPDATE" === dataJson.mode ){
          tmpQuery = `UPDATE ${tmpTableName} \nSET ${tmpColumnAndValues} \nWHERE 1=1 ${tmpWheres}`;
      } else if ( "UPDATE-SELECT" === dataJson.mode ){
          tmpQuery = `UPDATE ${tmpTableName} \nSET ${tmpColumnAndValues} \nFROM (${dataJson.dummy}) dummy \nWHERE 1=1 ${tmpWheres}`;
      } else if ( "DELETE" === dataJson.mode ){
          tmpQuery = `DELETE FROM ${tmpTableName} \nWHERE 1=1 ${tmpWheres}`;
      } else {
          //pass
      }
      return tmpQuery;
  }
  
}();

module.exports = common;
