import { UserRepository } from "@/repositories/userRepository";
import type { UserCreateInput, UserUpdateInput } from "../../generated/prisma/models";

export const UserServices = {
    //Since only have one user for now, will change when diversify user
    getCurrentUser: () =>{
        return UserRepository.findFirst();
    },
    getById: async (userId: number) => {
        const user = await UserRepository.findById(userId);
        if (!user) throw new Error("User not found!");
        return user;
    },

    createUser: (data:UserCreateInput) =>{
        if (!data.name) throw new Error ("Require a name");
        if (!data.location) throw new Error ("Missing Location");
        if (!data.jobTitle) throw new Error ("Missing Job Title");
        if (!data.description) throw new Error ("Missing description");
        return UserRepository.create(data)
    },

    updateUserInfo: async (userId: number, data: UserUpdateInput) =>{
        await UserServices.getById(userId);
        if (!data.name) throw new Error ("Require a name");
        if (!data.location) throw new Error ("Missing Location");
        if (!data.jobTitle) throw new Error ("Missing Job Title");
        if (!data.description) throw new Error ("Missing description");
        return UserRepository.update(userId, data)
    }
}