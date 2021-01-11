class TodoController{
    async controlGetTodo(req,res,services){
        try {
            const getData = await services.getAllTodo();
            res.send(getData);    
        } catch (e) {
            res.status(500);
            res.json({message: e});
        }
        
    }
    
    async controlCreateTodo(req,res,services){
        try {
            const dataBody = req.body;
            const createData = await services.createTodo(dataBody);
            res.send(createData);
        } catch (e) {
            res.status(500);
            res.json({message: e});
        }
        
    }

    async controlDeleteTodo(req, res,services){
        try {
            const deleteData = await services.deleteTodo(req.params.id);
            res.json("Success deleted");
        } catch (e) {
            res.status(500);
            res.json({message: e});
        }
    }
}

module.exports = TodoController;