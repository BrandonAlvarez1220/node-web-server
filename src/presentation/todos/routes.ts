import { Router } from "express";
import { TodosController } from "./controller";


export class TodoRoutes {

    static get routes(): Router {

        const router = Router();
        const todocontroller = new TodosController();

        router.get('/',todocontroller.getTodos );
        router.get('/:id',todocontroller.getTodoById );
        router.put('/:id',todocontroller.updateTodo );
        router.delete('/:id',todocontroller.deleteTodo );
        router.post('/',todocontroller.createTodo );

        

        return router;

    }

}