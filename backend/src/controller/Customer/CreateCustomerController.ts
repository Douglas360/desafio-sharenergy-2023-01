import { Request, Response } from 'express';
import { CreateCustomerService } from '../../services/Customer/CreateCustomerService';
import { CustomerType } from '../../types/CustomerType';

class CreateCustomerController {
    async create(req: Request, res: Response) {
        try {
            const { name, email, phone, address, cpf } = req.body;
            const customer = { name, email, phone, address, cpf } as CustomerType;

            const createCustomerService = new CreateCustomerService();
            const newCustomer = await createCustomerService.execute(customer);

            return res.status(201).json(newCustomer);
        } catch (error) {
            
            if (error instanceof Error && error.message === 'Fields are required') {
                return res.status(400).json({ error: 'Fields are required' });
            }
            if (error instanceof Error && error.message === 'Email already in use') {
                return res.status(400).json({ error: 'Email already in use' });
            }
            if (error instanceof Error && error.message === 'CPF already in use') {
                return res.status(400).json({ error: 'CPF already in use' });
            }
            console.log(error)
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}

export { CreateCustomerController };