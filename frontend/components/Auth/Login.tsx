"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AuthService } from "@/services/auth.service";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader2 } from "lucide-react";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      await AuthService.login(username, password);
      router.push("/");
      router.refresh();
    } catch (err: any) {
      console.error(err);
      setError("ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>

      <Card className="max-w-7xl max-w-xl shadow-xl bg-white/40 backdrop-blur-md border border-white/40 overflow-hidden">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">เข้าสู่ระบบ</CardTitle>
        </CardHeader>
        
        <CardContent>
          <form onSubmit={handleLogin}>
            <div className="grid gap-6">
              
              {error && (
                <div className="p-3 text-sm text-red-600 bg-red-100/80 rounded-md text-center font-medium">
                  {error}
                </div>
              )}

              <div className="grid gap-2">
                <Label htmlFor="username" className="font-semibold text-gray-800">
                  Username
                </Label>
                <Input
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  disabled={isLoading}
                  className="bg-white/60 border-white/50 focus:bg-white"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password" className="font-semibold text-gray-800">
                  Password
                </Label>
                <Input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                  className="bg-white/60 border-white/50 focus:bg-white"
                />
              </div>

              <Button 
                type="submit" 
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-bold"
                disabled={isLoading}
              >
                {isLoading ? (
                    <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" /> กำลังเข้าสู่ระบบ...
                    </>
                ) : (
                    "Login"
                )}
              </Button>
            
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}