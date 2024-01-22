import {User} from '@app/models/backend/user';

export { User as UserResponse} from '@app/models/backend/user';

export interface EmailPasswordCredentials{
    email: string;
    password: string;
}

export interface UserRequest extends User {

}

export interface UserRequest extends User {
    password: string;
    password2: string;
}

export type UserCreateRequest = Omit<UserRequest, 'token'>;