import { createContextInner } from "~/libs/trpc";
import { inferProcedureInput } from "@trpc/server";
import { AppRouter, testRouter } from "~/routers/app";
import { User } from "~/domain/entities/user";

describe("userRouter", async () => {
  it("create", async () => {
    const ctx = await createContextInner();
    const caller = testRouter.createCaller(ctx);

    const input: inferProcedureInput<AppRouter["user"]["create"]> = {
      body: {
        name: "Test",
        email: "test@example.com",
        password: "drowssap",
        id: "test",
      },
    };

    const user = await caller.user.create(input);

    expect(user).toStrictEqual<User>(
      expect.objectContaining({
        name: "Test",
        email: "test@example.com",
        id: "test",
      })
    );
  });
});
