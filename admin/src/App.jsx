import Navbar from "./component/Navbar";
import Sidebar from "./component/Sidebar";

export default function App() {
  return (
  <>
   <div className="bg-gray-50 min-h-screen">
    <Navbar/>
    <hr />
     <div className="flex w-full">
      <Sidebar/>
     </div>
    </div> 
  </>
  )
}