import { 
    BarChart4,
    Building2,
    PanelsTopLeft,
    Settings,
    ShieldCheck,
    CircleHelpIcon,
    Calendar,
    Circle
} from "lucide-react";

export const dataGeneralSidebar = [
    {
        icon: PanelsTopLeft,
        label: "Inicio",
        href: ""
    },
    {
        icon: Building2,
        label: "Ordenes",
        href: "/Orders"
    },
    {
        icon: Calendar,
        label: "Calendario",
        href: "/Calendar"
    },
]

export const dataToolsSidebar = [
    {
        icon: CircleHelpIcon,
        label: "Faqs",
        href: "/faqs"
    },
    {
        icon: BarChart4,
        label: "Analytics",
        href: "/analytics"
    },
]

export const dataSupportSideBar = [
    {
        icon: Settings,
        label: "Settings",
        href: "/settings"
    },
    {
        icon: ShieldCheck,
        label: "Security",
        href: "/security"
    },
]

