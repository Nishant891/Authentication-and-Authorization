"use client"
import * as React from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { useRecoilValue } from "recoil"
import { userState } from "./auth/states/states"
import { useRouter } from "next/navigation"

export const Home = () => {
  const router = useRouter();
  const user = useRecoilValue(userState);

  const handleSignupClick = () => {
    router.push("/auth/signup");
  }
  const handleLoginClick = () => {
    router.push("/auth/login");
  }
  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>Click signup or login to continue authentication.</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name : {user.username}</Label>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Email : {user.email}</Label>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Password : ********</Label>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button size="lg" variant="outline" onClick={() => {handleSignupClick()}}>SignUp</Button>
        <Button size="lg" onClick={() => {handleLoginClick()}}>Login</Button>
      </CardFooter>
    </Card>
  )
}
export default Home;
