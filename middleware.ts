import { authMiddleware } from "@clerk/nextjs";

export default authMiddleware();

// 在这边决定哪一个 page 进入的话要 redirect to login page
export const config = {
  // matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
  matcher: [
    "/" // 当用户到达 /home-page 的时候，会被重新定向到 signin 
  ],
};
