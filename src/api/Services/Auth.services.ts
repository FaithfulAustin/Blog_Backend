import UserModel from "../Modal/UserModel"
import HttpException from "../error/HttpException"
import { StatusCodes } from "http-status-codes"
import { generatePassword } from "../Utils/generatePassword"
import Jwt from "../Utils/jwt"
import PasswordModel from "../Modal/Password"
//otp
export default class AuthService {
  private userModel = UserModel


  public async getPassword({ email }: { email: string }) {

    const findByEmail = await this.findByEmail(email)
    let message = '';

    //NEW USERS
    if (!findByEmail) {
      message += "Welcome 🤗!!"
    } else {
      message += "Welcome back!!"
    }
    const password = await generatePassword(email, message)

    //Saving the otp to the database
    // const generatedOTP = await OTPModel.create(email , otp );
    // if (!generatedOTP) throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, "Otp error occurred");

    return { password }
  }

  public async passwordVerification({ password, email }: { password: string, email: string }) {


    const passwordData = await PasswordModel.findOne({ password: password, email });
    const findByEmail = await this.findByEmail(email)


    if (passwordData) {

      //Add a New User
      if (!findByEmail) {
        const newAccount = await this.userModel.create({ email, last_auth_type: "native" });
        if (!newAccount) throw new HttpException(StatusCodes.INTERNAL_SERVER_ERROR, "an error occurred");

      }
      //DELETE Password WHEN VERIFIED
      await PasswordModel.findByIdAndDelete(passwordData._id);

      const token = Jwt.signJwt(email, "30d")
      return { token }
    } else {
      throw new HttpException(StatusCodes.NOT_FOUND, "Invalid Password, please resend")
    }

  }

  public async findByEmail(email: string) {
    const account = await this.userModel.findOne({ email })
    return account;
  }

  public async verify(token: string) {
    const { value: email } = Jwt.verifyJwt(token)
    const account = await this.findByEmail(email);
    if (!account) throw new HttpException(StatusCodes.NOT_FOUND, "account not found");
    if (account.isVerified) throw new HttpException(StatusCodes.NOT_ACCEPTABLE, "user is already verified");
    account.isVerified = true;
    await account.save();
    return account;
  }

}