import { Request, Response } from 'express';
import { DeleteCustomerService } from '../../services/Customer/DeleteCustomerService';

class DeleteCustomerController {
    async delete(req: Request, res: Response) {
        const { id } = req.params;

        const deleteCustomerService = new DeleteCustomerService();
        try {
            await deleteCustomerService.execute({ id });
            return res.status(200).json({ message: "Customer removed successfully" });
        } catch (error) {
            if (error instanceof Error && error.message === 'Customer not found') {
                return res.status(400).json({ error: 'Customer not found' });
            }
            return res.status(500).json({ error: 'Internal server error' });
        }
    }
}
export { DeleteCustomerController };