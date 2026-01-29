import Link from "next/link";
import { Button } from "../ui/button";

const Signin = () => {
  return (
    <div className="container flex justify-between py-8 sm:flex-row sm:items-center gap-4">
      <Button className="text-xl text-black">
        <Link href={'/login'}>LOGIN</Link>
      </Button>
    </div>
  );
};
export default Signin;