import { useSession } from "@/auth/SessionContext";
import { FiUser, FiBook, FiDollarSign, FiChevronRight } from "react-icons/fi";
import { Link } from "react-router-dom";
function generateGreeting(name: string) {
  let greeting = `Welcome, ${name}`;
  const currentTime = new Date();
  const hours = currentTime.getHours();
  if (hours >= 5 && hours < 12) {
    greeting = `Good morning, ${name}`;
  } else if (hours >= 12 && hours < 18) {
    greeting = `Good afternoon, ${name}`;
  } else if (hours >= 18 && hours < 22) {
    greeting = `Good evening, ${name}`;
  } else {
    greeting = `Good night, ${name}`;
  }
  return greeting;
}

type QuickLink = {
  title: string;
  url: string;
  Icon: (className?: string) => React.ReactNode;
};

const quickLinks: QuickLink[] = [
  {
    title: "Students",
    url: "/students",
    Icon: (className) => <FiUser className={className} />,
  },
  {
    title: "Courses",
    url: "/courses",
    Icon: (className) => <FiBook className={className} />,
  },
  {
    title: "Fees",
    url: "/fees",
    Icon: (className) => <FiDollarSign className={className} />,
  },
];

export default function HomePage() {
  const { session } = useSession();
  const name = session?.user.user_metadata.display_name;

  return (
    <>
      <div className="select-none w-full bg-gradient-to-br p-6 from-primary to-primary/65 rounded-xl flex flex-col text-white items-center">
        <h1 className="text-3xl md:text-4xl mt-4 mb-2 text-center">
          {generateGreeting(name)}
        </h1>
        <p className="mb-4 text-base text-center text-white/85 w-[80%]">
          Here are some quick links to get you started.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 w-full mt-8 mb-2">
          {quickLinks.map((link) => (
            <Link className="hover:!text-white" to={link.url} key={link.title}>
              <div className="transition bg-white/20 hover:bg-white/25 rounded p-2 flex items-center gap-4 group">
                <div className="w-10 h-10 rounded bg-white/30 p-2">
                  {link.Icon("text-white/70 w-full h-full")}
                </div>
                <p>{link.title}</p>
                <FiChevronRight className=" transition h-5 w-5 text-white ml-auto mr-2 group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  );
}
