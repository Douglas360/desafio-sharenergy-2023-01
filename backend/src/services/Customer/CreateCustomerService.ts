import { Customer } from '../../models/Customer';
import { CustomerType } from '../../types/CustomerType';

class CreateCustomerService {
    async execute(customer: CustomerType) {
        //validações
        if (!customer.email || !customer.cpf || !customer.name) {
            throw new Error("Fields are required");
        }

        const emailExists = await Customer.findOne({ email: customer.email });
        const cpfExists = await Customer.findOne({ cpf: customer.cpf });

        if (emailExists) {
            throw new Error("Email already in use");
        }

        if (cpfExists) {
            throw new Error("CPF already in use");
        }

        //realiza o cadastro de novo cliente
        const newCustomer = await Customer.create(customer);

        return newCustomer;
    }
}

export { CreateCustomerService };
