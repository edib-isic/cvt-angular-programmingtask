export class User {
    id!: number;
    firstName!: string;
    lastName!: string;
    emailId!: string;
    roles!: Array<{ name: string }>;
}