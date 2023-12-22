import express from 'express'
import { Request, Response } from 'express'
import { CreateUserUseCase } from '../../domain/interfaces/use-cases/user/create-user-use-case'
import { FindByIdUserUseCase } from '../../domain/interfaces/use-cases/user/find-by-id-user-use-case';
import { DeleteUserUseCase } from '../../domain/interfaces/use-cases/user/delete-user-use-case';
import { GetAllUserUseCase } from '../../domain/interfaces/use-cases/user/get-all-user-use-case';
import { UpdateUserUseCase } from '../../domain/interfaces/use-cases/user/update-user-use-case';
import passport, { Passport } from 'passport';


export default function UserRouter(
    createUserUseCase: CreateUserUseCase,
    findUserByIdUseCase: FindByIdUserUseCase,
    deleteUserUseCase: DeleteUserUseCase,
    getAllUserUseCase: GetAllUserUseCase,
    updateUserUseCase: UpdateUserUseCase,
) {
    const router = express.Router()
    const passport = new Passport()
     router.post('/', async (req: Request, res: Response) => {
        try {
            await createUserUseCase.execute(req.body)
            res.statusCode = 201
            res.json({ message: "Created" })
        } catch (err) {
            console.log(err.message)
            res.status(500).send({ message: "Error saving data" })
        }
    })
    
 
    router.get('/:id',async (req: Request, res: Response) => {
        try {
            const user = await findUserByIdUseCase.execute(req.params.id)
            res.send(user)

        } catch (err) {
            console.log(err.message)
            res.status(500).send({ message: "Error fetching data" })
        }
    })

    router.get('/', passport.authenticate('jwt',{session: false}), async (req: Request, res: Response) => {
        try {
            const users = await getAllUserUseCase.execute()
            res.send(users)

        } catch (err) {
            console.log(err.message)
            res.status(500).send({ message: "Error fetching data" })
        }
    })

    router.delete('/:id', passport.authenticate('jwt',{session: false}),async (req: Request, res: Response ) =>{
        try{
            await deleteUserUseCase.execute(req.params.id)
            res.statusCode = 201
            res.json({ message: "Deleted" })

        } catch (err){
            console.log(err.message)
        }
    })

    router.put('/:id', passport.authenticate('jwt',{session: false}),async (req: Request, res: Response ) =>{
        try{
            await updateUserUseCase.execute(req.params.id,req.body)
            res.statusCode = 201
            res.json({ message: "Updated" })

        } catch (err){
            console.log(err.message)
        }
    })
    return router
}