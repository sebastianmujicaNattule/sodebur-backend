import express from 'express'
import { Request, Response } from 'express'
import { CreateContactUseCase } from '../../domain/interfaces/use-cases/contact/create-contact-use-case'


export default function ContactsRouter(
    createContactUseCase: CreateContactUseCase
) {
    const router = express.Router()

     router.post('/', async (req: Request, res: Response) => {
        try {
            await createContactUseCase.execute(req.body)
            res.statusCode = 201
            res.json({ message: "Created" })
        } catch (err) {
            console.log(err.message)
            res.status(500).send({ message: "Error saving data" })
        }
    })

    return router
}