let db;
var shortName = 'crud';
var version = '1.0';
var displayName = 'crud';
var maxSize = 65535;


db = openDatabase(shortName, version, displayName,maxSize);

export default db;

// db.transaction(function(tx){
//   tx.executeSql('CREATE TABLE usuarios (id Integer primary key autoincrement, nome TEXT, apelido TEXT)');
// });
