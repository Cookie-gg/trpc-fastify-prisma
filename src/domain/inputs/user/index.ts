import { z } from "zod";
import { zUser } from "~/domain/entities/user";

const create = z.object({ body: zUser.omit({ uid: true }) });

const get = z.object({ param: zUser.pick({ id: true }) });

const update = z.object({ param: zUser.pick({ id: true }), body: zUser });

const del = z.object({ param: zUser.pick({ id: true }) });

const signup = z.object({ body: zUser.pick({ email: true, password: true }) });

export const userInput = {
  create,
  get,
  update,
  delete: del,
  signup,
};

export namespace UserInput {
  export type Create = z.infer<typeof create>;
  export type Get = z.infer<typeof get>;
  export type Update = z.infer<typeof update>;
  export type Delete = z.infer<typeof del>;
  export type Signup = z.infer<typeof signup>;
}
