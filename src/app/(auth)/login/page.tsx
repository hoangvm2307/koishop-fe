import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  return (
    <div className="container mx-auto mt-20 max-w-md">
      <h1 className="text-2xl font-bold mb-6 text-center">LOGIN</h1>
      <form className="space-y-4">
        <div>
          <label htmlFor="email" className="block text-sm font-bold text-gray-700 mb-1">
            Email
          </label>
          <Input type="email" id="email" placeholder="Enter your email" required />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-bold text-gray-700 mb-1">
            Password
          </label>
          <Input type="password" id="password" placeholder="Nhập mật khẩu của bạn" required />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <a href="#" className="font-medium text-primary hover:text-primary-dark">
              Forgot password?
            </a>
          </div>
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
      </form>
      <p className="mt-4 text-center text-sm text-gray-600">
        Don't have an account?{" "}
        <a href="#" className="font-medium text-primary hover:text-primary-dark">
          Register now
        </a>
      </p>
    </div>
  );
}
