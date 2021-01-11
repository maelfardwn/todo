const Todo = require('../models/todo.model');
const logEvent = require('../events/myEmitter');

class TodoServices{

    async getAllTodo(){
        let result;

        try {
            result = await Todo.findAll();
        } catch (e) {
            logEvent.emit('APP_ERROR', {
                logTitle : '[GET-ALL-todo-ERROR]',
                logMessage : e
            })
        }

        return result;
    }

    async createTodo(todo){
        let result;

        try {
            result = await Todo.create(todo);
        } catch (e) {
            logEvent.emit('APP_ERROR', {
                logTitle : '[CREATE-todo-ERROR]',
                logMessage : e
            })
        }

        return result;
    }

    async deleteTodo(id){
        let result;

        try{
           result = await Todo.destroy( {where : {
                id : id
           }})
    
        }catch(e){
            logEvent.emit('APP_ERROR', {
                logTitle : '[Delete-todo-ERROR]',
                logMessage : e
            })
        }
        return result;
    }
}

module.exports = TodoServices;