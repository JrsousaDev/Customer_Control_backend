import { inject, injectable } from "tsyringe";
import { CustomersRepository } from "../../repositories/CustomersRepository";
import { AppError } from "../../shared/errors/AppError";

interface UpdateDueDateCustomerUseCaseRequest {
  customerId: string;
  userId: string;
  dueDate: string;
}

@injectable()
export class UpdateDueDateCustomerUseCase {
  constructor(
    @inject("CustomersRepository")
    private customersRepository: CustomersRepository,
  ){}

  async execute({
    customerId, dueDate, userId
  }: UpdateDueDateCustomerUseCaseRequest) {
    if(!customerId || !dueDate) throw new AppError('Internal server error!');

    const customerAlreadyExist = await this.customersRepository.getOneInID({
      customerId,
      userId,
    });

    if(!customerAlreadyExist || customerAlreadyExist === null) throw new AppError('Internal server error!');

    const customer = await this.customersRepository.updateDueDate({
      customerId,
      dueDate,
    })

    return customer;
  }
}