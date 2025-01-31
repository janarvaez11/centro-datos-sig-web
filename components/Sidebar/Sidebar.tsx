import { Logo } from "@/components/Logo";
import SidebarRoutes from "../SidebarRoutes/SidebarRoutes";

export function Sidebar() {
    return (
        <div className="h-screen">
            <div className="h-full flex flex-col border-r overflow-y-auto">
                <Logo/>
                <SidebarRoutes/>

            </div>
        </div>
    );
}