import { AppWindowIcon, CodeIcon, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect, useState } from "react";
import {
  useLoginUserMutation,
  useRegisterUserMutation,
} from "@/features/api/authAPI";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [LoginInput, setLoginInput] = useState({ email: "", password: "" });
  const [SignupInput, setSignupInput] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [
    register,
    {
      Data: registerData,
      Error: registerError,
      isLoading: registerIsLoading,
      isSuccess: registerIsSuccess,
    },
  ] = useRegisterUserMutation();
  const [
    login,
    {
      data: loginData,
      error: loginError,
      isLoading: loginIsLoading,
      isSuccess: loginIsSuccess,
    },
  ] = useLoginUserMutation();

  const navigate = useNavigate();

  const changeInputHandler = (e, type) => {
    const { name, value } = e.target;
    if (type === "signup") {
      setSignupInput({ ...SignupInput, [name]: value });
    } else {
      setLoginInput({ ...LoginInput, [name]: value });
    }
  };

  const handleRegistration = async (type) => {
    const inputData = type === "signup" ? SignupInput : LoginInput;
    const action = type === "signup" ? register : login;
    await action(inputData);
  };

  useEffect(() => {
    if (registerIsSuccess && registerData) {
      toast.success(registerData.message || "Registration successful!");
    }
    if (registerError) {
      toast.error(registerData.data.message || "Registration failed!");
    }
    if (loginIsSuccess && loginData) {
      toast.success(loginData.message || "Login successful!");
      navigate("/");
    }
    if (loginError) {
      toast.error(loginData.data.message || "Login failed!");
    }
  }, [
    loginIsLoading,
    registerIsLoading,
    registerData,
    loginData,
    registerError,
    loginError,
  ]);

  return (
    <div className="flex w-full max-w-sm flex-col gap-6 items-center justify-center mt-20">
      <Tabs defaultValue="signup">
        <TabsList>
          <TabsTrigger value="signup">Signup</TabsTrigger>
          <TabsTrigger value="login">Login</TabsTrigger>
        </TabsList>
        <TabsContent value="signup">
          <Card>
            <CardHeader>
              <CardTitle>Signup</CardTitle>
              <CardDescription>
                Create a new account. Click signup when you&apos;re done.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-name">Name</Label>
                <Input
                  type="text"
                  name="name"
                  value={SignupInput.name}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  placeholder="e.g., John Doe"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-username">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={SignupInput.email}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  placeholder="e.g., johndoe@gmail.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-username">Password</Label>
                <Input
                  type="password"
                  name="password"
                  value={SignupInput.password}
                  onChange={(e) => changeInputHandler(e, "signup")}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={registerIsLoading}
                onClick={() => handleRegistration("signup")}
              >
                {registerIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    Wait.
                  </>
                ) : (
                  "Register"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="login">
          <Card>
            <CardHeader>
              <CardTitle>Login</CardTitle>
              <CardDescription>
                Login to your account. Click login when you&apos;re done.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-current">Email</Label>
                <Input
                  type="email"
                  name="email"
                  value={LoginInput.email}
                  onChange={(e) => changeInputHandler(e, "login")}
                  placeholder="e.g., johndoe@gmail.com"
                  required
                />
              </div>
              <div className="grid gap-3">
                <Label htmlFor="tabs-demo-new">New password</Label>
                <Input
                  type="password"
                  name="password"
                  value={LoginInput.password}
                  onChange={(e) => changeInputHandler(e, "login")}
                  required
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                disabled={loginIsLoading}
                onClick={() => handleRegistration("login")}
              >
                {loginIsLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Please
                    Wait.
                  </>
                ) : (
                  "Login"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};
export default Login;
