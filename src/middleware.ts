import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { DecodedToken } from "./lib/axios";
console.log("Log message"); // log thông thường
console.error("Error message"); // log lỗi (màu đỏ)
console.warn("Warning message"); // log cảnh báo (màu vàng)
console.info("Info message");
export function middleware(request: NextRequest) {
  const token = request.cookies.get("token")?.value;
  const { pathname } = request.nextUrl;
  
  // 1. Kiểm tra guest (không có token)
  const protectedRoutes = ['/profile', '/admin', '/staff'];
  if (!token && protectedRoutes.some(route => pathname.startsWith(route))) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("redirect", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Kiểm tra người dùng đã đăng nhập
  if (token) {
    try {
      const decoded = jwtDecode<DecodedToken>(token);
      const roles = decoded["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];
      console.log('Current roles:', roles);

      // 2.1. Kiểm tra Staff - chỉ được vào trang /staff
      if (roles.includes("Staff")) {
        if (!pathname.startsWith("/staff")) {
          return NextResponse.redirect(new URL("/staff/consignments", request.url));
        }
      }

      // 2.2. Kiểm tra Admin - chỉ được vào trang /admin
      if (roles.includes("Admin")) {
        if (!pathname.startsWith("/admin")) {
          return NextResponse.redirect(new URL("/admin/dashboard", request.url));
        }
      }

      // 2.3. Kiểm tra Customer - không được vào trang admin và staff
      if (roles.includes("Customer")) {
        if (pathname.startsWith("/admin") || pathname.startsWith("/staff")) {
          return NextResponse.redirect(new URL("/", request.url));
        }
      }
    } catch (error) {
      console.error("Lỗi khi decode token:", error);
      // Nếu có lỗi với token, có thể chuyển hướng về login
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};