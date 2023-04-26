import { IoPersonAddSharp } from "react-icons/io5";
export default function FollowRecomendation() {
  return (
    <div className="p-4 rounded-lg bg-white flex flex-col gap-3 shadow-lg">
      <span className="font-bold">Who to follow</span>
      <hr className="bg-gray-100" />
      <div className="flex flex-col gap-3">
        <div className="grid grid-cols-2 itmes-center gap-2">
          <div className="flex gap-2 ">
            <img
              src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8cHJvZmlsZXxlbnwwfHwwfHw%3D&w=1000&q=80"
              alt="Imagen de perfil"
              className="h-12 w-12 rounded-lg object-cover"
            />
            <div>
              <span className="font-bold">Nombre</span>
              <p className="text-sm whitespace-nowrap">230k followers</p>
            </div>
          </div>
          <button className="justify-self-end self-center bg-blue-600 px-6 py-1 text-white rounded-lg flex gap-1 items-center flex-nowrap">
            <IoPersonAddSharp />
            follow
          </button>
        </div>
        <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quia, quisquam!</p>
        <div className="w-full max-h-32 rounded-lg overflow-hidden">
          <img 
          src="https://marketplace.canva.com/EAD2962NKnQ/2/0/1600w/canva-rainbow-gradient-pink-and-purple-virtual-background-_Tcjok-d9b4.jpg"
          alt="bg" />
        </div>
        <hr className="bg-gray-100" />
      </div>
    </div>
  );
}
