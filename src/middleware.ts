import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Lấy token từ cookie
  const token = request.cookies.get("token");

  // Kiểm tra nếu đang truy cập trang profile
  if (request.nextUrl.pathname.startsWith("/profile")) {
    console.log(`Token: ${token}`);
    if (!token) {
      // Nếu không có token, chuyển hướng về trang login
      const loginUrl = new URL("/login", request.url);
      // Thêm redirect_url để sau khi login có thể quay lại trang profile
      loginUrl.searchParams.set("redirect", request.nextUrl.pathname);

      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

// Chỉ định các đường dẫn cần được middleware kiểm tra
export const config = {
  matcher: ["/profile/:path*"],
};
