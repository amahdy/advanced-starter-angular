import { Address } from './address';

export class Person {
  constructor(
    public firstName: string = '',
    public lastName: string = '',
    public adress: Address = new Address(),
    public email: string = ''
  ) {}
}
