import { Request, Response } from 'express';
import { ListCustomerService } from '../../services/Customer/ListCustomerService';

class ListCustomerController {
    async list(req: Request, res: Response) {
        try {
            const listCustomerService = new ListCustomerService();
            const customers = await listCustomerService.execute();
            return res.status(200).json(customers);
        } catch (error) {
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}
export { ListCustomerController };