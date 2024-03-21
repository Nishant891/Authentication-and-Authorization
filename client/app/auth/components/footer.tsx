"use client";
import React from "react";
interface FooterProps {
  footerlabel: string;
  footerhref: string;
}
const Footer = ({ footerlabel, footerhref }: FooterProps) => {
  return (
    <div className="w-full">
      <a className="cursor-pointer" onClick={() => {}} href={footerhref}>
        <p className="text-right text-slate-500 text-sm hover:text-blue-400">{footerlabel}</p>
      </a>
    </div>
  );
};

export default Footer;
