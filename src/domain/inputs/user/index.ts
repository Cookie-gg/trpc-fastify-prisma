import { z } from "zod";
import { zUser } from "~/domain/entities/user";

const create = z.object({ body: zUser.omit({ uid: true }) });

const update = z.object({ body: zUser });

const signin = z.object({ body: zUser.pick({ email: true, password: true }) });

export const userInput = {
  create,
  update,
  signin,
};

export namespace UserInput {
  export type Create = z.infer<typeof create>;
  export type Update = z.infer<typeof update>;
  export type Signup = z.infer<typeof signin>;
}
