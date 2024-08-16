import { prisma } from "../../data/postgres/index";
import { error } from "console";
import { Request, Response } from "express"
import { CreateTodoDto, UpdateTodoDto } from "../../domain/dtos/todos";



export class TodosController { 


    constructor(){}

    public getTodos = async (req: Request,res: Response) => {
        
        const todo = await prisma.todo.findMany();
        
        res.json(todo);
       
    }

    public getTodoById = async (req:Request , res: Response) => {
        const id = +req.params.id;

        if(isNaN(id)) return res.status(400).json({error: 'ID argument is not a number'});

        const todo = await prisma.todo.findUnique({
            where : {
                id
            }
        });

        res.json(todo);

        // const todo = todos.find(todo => todo.id === id);
    
       // (todo ?  res.json(todo) :  res.status(404).json({error: `TODO with id ${id} not found`}));
        
    }

    public createTodo = async (req: Request , res: Response) =>{
        
        const [error, createTodoDto] = CreateTodoDto.create(req.body);

        if(error) return res.status(400).json({error});
        

        const todo = await prisma.todo.create({
            data: createTodoDto!
        });

        res.json(todo);
    }


    public updateTodo = async(req:Request, res:Response) => {
        const id = +req.params.id;
        const [error,updateTodoDto] = UpdateTodoDto.create({
            ...req.body,id
        });

        if(error) return res.status(400).json({error});

        const todo = await prisma.todo.findFirst({
            where: {id}
        });

        if(!todo) return res.status(400).json({error: `Todo with id ${id} not found`});


        const updatedTodo = await prisma.todo.update({
            where: {id},
            data: updateTodoDto!.values
        });

        res.json(updatedTodo);

        // todo.text = text || todo.text ;

        // (completedAt === 'null')
        //     ? todo.completedAt == null
        //     : todo.completedAt = new Date(completedAt || todo.completedAt);

        //OJO, referencia
        // todos.forEach( (todo,index) => {
        //     if(todo.id === id){
        //         todos[index] = todo
        //     }
        // } );

        //res.json()
    }


    public deleteTodo = async(req: Request , res: Response) => {
        const id = +req.params.id;
        // const todo = todos.find(todo => todo.id === id);

        const todo = await prisma.todo.findFirst({where: {id}});

        const deleted = await prisma.todo.delete({
            where: {id}
        });
        
        if(!todo) return res.status(404).json({error: `Todo with id ${id} not found`});

        //todos.splice(todos.indexOf(todo),1);

        (deleted)
            ? res.json(deleted)
            : res.status(400).json({error : `Todo with id ${id} not found`})

        
    }

}