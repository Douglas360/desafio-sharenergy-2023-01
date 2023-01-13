import { Request, Response } from 'express';
import { UpdateCustomerService } from '../../services/Customer/UpdateCustomerService';

class UpdateCustomerController {
    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { name, email, phone, address, cpf } = req.body;
            const updateCustomerService = new UpdateCustomerService();
            const customer = await updateCustomerService.execute({ id, name, email, phone, address, cpf });
            return res.status(200).json(customer);
        } catch (error) {
            if (error instanceof Error && error.message === 'Customer not found') {
                return res.status(400).json({ error: 'Customer not found' });
            }
            if (error instanceof Error && error.message === 'Email already in use') {
                return res.status(400).json({ error: 'Email already in use' });
            }
            if (error instanceof Error && error.message === 'CPF already in use') {
                return res.status(400).json({ error: 'CPF already in use' });
            }

            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}
export { UpdateCustomerController };