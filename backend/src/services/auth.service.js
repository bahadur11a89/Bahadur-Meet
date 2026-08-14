import crypto from "crypto";
import {
    createUser,
    findUserByUsername,
} from "../repositories/user.repository.js";
import {
    hashPassword,
    comparePassword,
} from "../helpers/password.helper.js";

export const registerUser = async ({ name, username, password }) => {

    const existingUser = await findUserByUsername(username);

    if (existingUser) {
        throw new Error("User already exists");
    }

    const hashedPassword = await hashPassword(password);

    return await createUser({
        name,
        username,
        password: hashedPassword,
    });
};

export const loginUser = async ({ username, password }) => {

    const user = await findUserByUsername(username);

    if (!user) {
        throw new Error("User not found");
    }

    const isMatch = await comparePassword(password, user.password);

    if (!isMatch) {
        throw new Error("Invalid username or password");
    }

    const token = crypto.randomBytes(20).toString("hex");

    user.token = token;

    await user.save();

    return token;
};