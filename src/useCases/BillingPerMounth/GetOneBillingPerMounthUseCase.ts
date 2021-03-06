import { inject, injectable } from "tsyringe";
import { BillingPerMounthRepository } from "../../repositories/BillingsPerMounthsRepository";
import { UsersRepository } from "../../repositories/UsersRepository";
import { AppError } from "../../shared/errors/AppError";

interface GetOneBillingPerMounthUseCaseRequest {
  userId: string;
  mounthName: string;
  year: string;
}

@injectable()
export class GetOneBillingPerMounthUseCase {
  constructor(
    @inject("UsersRepository")
    private usersRepository: UsersRepository,
    @inject("BillingsPerMounthRepository")
    private billingPerMounthRepository: BillingPerMounthRepository,
  ) {}

  async execute(request: GetOneBillingPerMounthUseCaseRequest) {
    const { userId, mounthName, year } = request;

    const userAlreadyExist = await this.usersRepository.getUser({ userId });

    if(!userAlreadyExist) throw new AppError("Internal server error!");

    const mounth = await this.billingPerMounthRepository.getOne({
      userId,
      mounthName,
      year
    });

    if(!mounth) throw new AppError("Internal server error!");

    return mounth;
  }
}