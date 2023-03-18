import { f } from "~/main";
import connectDB from "~/libs/prisma";

beforeAll(async () => {
  try {
    await connectDB();
    await f.listen();
    console.log("💫 Server listening on port 5001...");
  } catch (err) {
    f.log.error(err);
    process.exit(1);
  }
});
afterAll(async () => {
  await f.close();
});
