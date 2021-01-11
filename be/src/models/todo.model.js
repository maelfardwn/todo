const Sequelize = require('sequelize');
const connection = require('../../dbConn');

const Todo = connection.define('todo', {
    id : {
        type : Sequelize.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    title : {
        type : Sequelize.STRING
    },
    desc : {
        type : Sequelize.STRING
    },
    date : {
        type : Sequelize.DATE
    },
}, {
    freezeTableName : true,
    tableName : 'todo',
    timestamps: false
});

module.exports = Todo;