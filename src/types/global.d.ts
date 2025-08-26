export { };

declare global {
    interface IBackendRes<T> {
        error?: string | string[];
        message: string;
        statusCode: number | string;
        data?: T;
    }

    interface IModelPaginate<T> {
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        },
        result: T[]
    }

    //login
    interface ILogin {
        access_token: string;
        user: {
            email: string;
            phone: string;
            fullname: string;
            role: string;
            avatar: string;
            id: string;
        }
    }

    //register
    interface IRegister {
        id: string;
        email: string;
        fullname: string;
    }

    interface IUser {
        email: string;
        phone: string;
        fullname: string;
        role: string;
        avatar: string;
        id: string;
    }

    interface IFetchAccount {
        user: IUser;
    }

    interface IUserTable {
        _id: String;
        fullname: string;
        email: string;
        phone: string;
        role: string;
        avatar: string;
        isActive: boolean;
        createdAt: Data;
        updatedAt: Data;
    }
}
