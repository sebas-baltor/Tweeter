import { AiFillHome, AiFillCompass } from "react-icons/ai";
import { MdBookmark, MdSettings } from "react-icons/md";
import { BsPersonCircle, BsFillPeopleFill } from "react-icons/bs";
import { BiExit } from "react-icons/bi";
export default function Navbar() {
  return (
    <nav className="w-full fixed z-10 top-0 right-0 flex items-center justify-between px-6 py-4 bg-white shadow-md">
      <div>
        <img
          src="./tweeter.svg"
          alt="Logo de la empresa"
          className="h-8"
        />
      </div>

      <div className="hidden w-1/4 lg:flex justify-between gap-6">
        <a href="/" className="group">
          <div className="relative group-hover:text-blue-500">
            Home
            <span className="w-full h-[3px] rounded-sm bg-blue-500 absolute -bottom-[100%] right-0 -translate-y-[3px] opacity-0 group-hover:opacity-100"></span>
          </div>
        </a>
        <a href="/explore" className="group">
          <div className="relative group-hover:text-blue-500">
            Explore
            <span className="w-full h-[3px] rounded-sm bg-blue-500 absolute -bottom-[100%] right-0 -translate-y-[3px] opacity-0 group-hover:opacity-100"></span>
          </div>
        </a>
        <a href="/bookmark" className="group">
          <div className="relative group-hover:text-blue-500">
            Bookmarks
            <span className="w-full h-[3px] rounded-sm bg-blue-500 absolute -bottom-[100%] right-0 -translate-y-[3px] opacity-0 group-hover:opacity-100"></span>
          </div>
        </a>
      </div>
      <div className="relative">
        <div>
          <button
            type="button"
            className="flex items-center focus:outline-none gap-3"
          >
            <div>
              <img
                src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
                alt="Imagen de perfil"
                className="h-8 w-8 rounded-lg object-cover"
              />
            </div>
            <div className="hidden lg:flex items-center">
              <span className="truncate">Nombre de usuario</span>
              <svg className="w-3 h-3 ml-1 fill-current" viewBox="0 0 12 12">
                <path d="M2.391,4.301c0.357-0.356,0.93-0.356,1.286,0l2.047,2.047l2.047-2.047c0.356-0.356,0.93-0.356,1.286,0 c0.357,0.357,0.357,0.93,0,1.287L7.021,8.635c-0.178,0.178-0.411,0.268-0.643,0.268c-0.232,0-0.465-0.089-0.643-0.268 L2.391,5.588C2.034,5.231,2.034,4.658,2.391,4.301z" />
              </svg>
            </div>
          </button>
        </div>
        <div className="absolute right-0 top-[200%] w-40 py-2 p-3 bg-white rounded-md shadow-md z-10 flex flex-col gap-1">
          <a
            href="/profile/1"
            className="flex gap-4 flex-nowrap items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-blue-600 rounded-md"
          >
            <BsPersonCircle />
            My profile
          </a>
          <a
            href="#"
            className="flex gap-4 flex-nowrap items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-blue-600 rounded-md"
          >
            <BsFillPeopleFill />
            Group Chat
          </a>
          <a
            href="#"
            className="flex gap-4 flex-nowrap items-center px-4 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-blue-600 rounded-md"
          >
            <MdSettings />
            Settings
          </a>
          <hr />
          <a
            href="#"
            className="flex gap-4 flex-nowrap items-center px-4 py-2 text-sm text-red-700 hover:bg-gray-100 rounded-md"
          >
            <BiExit />
            Logout
          </a>
        </div>
      </div>
      <div className="fixed bottom-0 right-0 w-full flex lg:hidden px-6 py-4 bg-white shadow-md justify-evenly gap-6 items-center text-2xl">
        <a href="/" className="group">
          <div className="relative group-hover:text-blue-500 text-gray-400">
            <AiFillHome />
            <span className="w-full h-[3px] rounded-sm bg-blue-500 absolute -bottom-[100%] right-0 -translate-y-[8px] opacity-0 group-hover:opacity-100"></span>
          </div>
        </a>
        <a href="explore" className="group">
          <div className="relative group-hover:text-blue-500 text-gray-400">
            <AiFillCompass />
            <span className="w-full h-[3px] rounded-sm bg-blue-500 absolute -bottom-[100%] right-0 -translate-y-[8px] opacity-0 group-hover:opacity-100"></span>
          </div>
        </a>
        <a href="/bookmark" className="group">
          <div className="relative group-hover:text-blue-500 text-gray-400">
            <MdBookmark />
            <span className="w-full h-[3px] rounded-sm bg-blue-500 absolute -bottom-[100%] right-0 -translate-y-[8px] opacity-0 group-hover:opacity-100"></span>
          </div>
        </a>
      </div>
    </nav>
  );
}
