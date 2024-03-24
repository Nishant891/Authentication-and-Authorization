import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import React from "react";
import Header from "./header";
import Footer from "./footer";
import Socials from "./socials";

interface CardWrapperProps {
  children: React.ReactNode,
  headerlabel: string;
  titlelabel: string;
  footerlabel: string;
  footerhref: string;
  showSocial?: boolean;
}

export const CardWrapper = ({
  children,
  headerlabel,
  titlelabel,
  footerlabel,
  footerhref,
  showSocial,
} : CardWrapperProps) => {
  return (
      <Card className="max-w-[40rem] max-h-[40rem] px-2">
        <CardHeader>
          <Header headerlabel={headerlabel} titlelabel={titlelabel}/>
        </CardHeader>
        <CardContent>
          {children}
        </CardContent>
        {showSocial && <Socials/>}
        <CardFooter className="pt-6">
          <Footer footerlabel={footerlabel} footerhref={footerhref} />
        </CardFooter>
      </Card>
  );
};

export default CardWrapper;
