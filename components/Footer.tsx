import Image from "next/image";
import Link from "next/link";
import { FaLinkedin, FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black text-gray-200 py-8">
      <div className="container mx-auto px-5">
        {/* Top Section */}
        <div className="flex flex-col md:flex-row justify-between items-center border-b border-gray-700 pb-6">
          {/* Logo and Description */}
          <div className="mb-6 md:mb-0">
            <Link href={"/"}>
              <Image
                src="/startups-light.png"
                alt="Startups Logo"
                width={160}
                height={37}
              />
            </Link>
            <p className="mt-4 max-w-sm text-gray-400 text-sm">
              Discover the latest insights, resources, and tools to launch and
              grow your startup. Our platform empowers entrepreneurs with
              tailored solutions and expert advice. Start your journey today!
            </p>
          </div>

          {/* Social Links */}
          <div className="flex gap-4 text-lg">
            <Link
              href="https://www.linkedin.com/in/mahmoudali01/"
              className="hover:text-primary transition duration-200"
              about="Mahmoud Ali LinkedIn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </Link>
            <Link
              href="https://github.com/MahmoudAliEid"
              className="hover:text-primary transition duration-200"
              about="Mahmoud Ali GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </Link>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} All rights reserved by{" "}
            <Link
              href="https://github.com/MahmoudAliEid"
              className="text-primary font-bold hover:underline transition duration-200"
              about="Mahmoud Ali GitHub"
              target="_blank"
              rel="noopener noreferrer"
            >
              @MahmoudAliEid
            </Link>
          </p>

          <nav className="mt-4 md:mt-0 flex gap-4 text-sm">
            <Link
              href="/"
              className="hover:text-primary transition duration-200"
              about="Home"
              target="_blank"
              rel="noopener noreferrer"
            >
              Home
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
