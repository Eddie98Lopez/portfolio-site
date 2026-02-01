import React from "react";
import Link from "next/link";
import { Github, Facebook, Instagram, Linkedin } from "lucide-react";

const SocialBar = () => {
  return (
    <div className="flex items-center gap-3">
      <Link href="https://github.com/Eddie98Lopez" target="_blank">
        <Github className="size-8" />
      </Link>
      <Link href="https://www.linkedin.com/in/eddie98lopez/" target="_blank">
        <Linkedin className="size-8" />
      </Link>
    </div>
  );
};

export default SocialBar;
