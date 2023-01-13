import { Types } from 'mongoose'
import { Customer } from "../../models/Customer";

class UpdateCustomerService {
    async execute({ id, name, email, phone, address, cpf }: { id: string, name: string, email: string, phone: string, address: string, cpf: string }) {
        //validations
        const customer = await Customer.findById(id);
        if (!customer) {
            throw new Error("Customer not found")
        }

        const idObject = new Types.ObjectId(id)
        const customerWithEmail = await Customer.findOne({ email });
        if (customerWithEmail && customerWithEmail._id.toString() !== idObject.toString()) {
            throw new Error("Email already in use")
        }


        const customerWithCPF = await Customer.findOne({ cpf });
        if (customerWithCPF && customerWithCPF._id.toString() !== idObject.toString()) {
            throw new Error("CPF already in use")
        }
        customer.name = name;
        customer.email = email;
        customer.phone = phone;
        customer.address = address;
        customer.cpf = cpf;
        await customer.save();
        return customer;
    }
}
export { UpdateCustomerService };