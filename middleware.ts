import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware();

// 在这边决定哪一个 page 进入的话要 redirect to login page
export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
