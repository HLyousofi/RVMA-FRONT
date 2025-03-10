import SidebarData from "./data/SidebarDatas";
import NavElement from "./ui/NavElement";

const Sidebar = ({ isOpen }) => {
  return (
    <aside
      className={`fixed bg-white left-0 z-40 w-64 h-screen transition-transform -translate-x-full
        ${ isOpen ? "md:translate-x-0" : "-translate-x-full" } `}
      aria-label="Sidebar"
    >
      <div className="h-full px-2 py-4 overflow-y-auto bg-gray-70 dark:bg-gray-800">
        <ul className="space-y-2 font-medium">
          {SidebarData.map((element, index) => {
            return <NavElement element={element} key={index} />;
          })}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;