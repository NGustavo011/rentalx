import { v4 as uuidV4 } from "uuid";

class User {
    id?: string;
    name: string;
    password: string;
    email: string;
    driver_license: string;
    avatar?: string;
    admin: boolean;
    created_at: Date;

    constructor() {
        if (!this.id) this.id = uuidV4();
    }
}

export { User };
