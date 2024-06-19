import UserModel from "../model/user.model";

export default class SocketUserGuard {
    static async isExist(email: string) {
        const findByEmail = await UserModel.findOne({ email })
        if (!findByEmail) {
            throw new Error('Unauthorized user');
        }
    }
}