<<<<<<< HEAD
import { InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';
import { CoreOutput } from './output.dto';

@InputType()
export class CreateAccountInput extends PartialType(User) {}
=======
import { InputType, ObjectType, PartialType, PickType } from "@nestjs/graphql";
import { User } from "../entities/user.entity";
import { CoreOutput } from "./output.dto";

@InputType()
export class CreateAccountInput extends PickType(PartialType(User), [
  "email",
  "password",
  "role"
]) {}
>>>>>>> f9d5e7830378e008ad5d75789a00ed803bb87838

@ObjectType()
export class CreateAccountOutput extends CoreOutput {}
