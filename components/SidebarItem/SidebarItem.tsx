import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { SidebarItemProps } from "./SidebarItem.types";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export function SiderbarItem({ item, isCollapsed }: SidebarItemProps) {
    const { label, icon: Icon, href } = item;
    const pathname = usePathname();
    const activePath = pathname === href;

    const content = (
        <Link href={href}
            className={cn(
                `flex items-center gap-x-2 text-slate-700 text-sm hover:bg-slate-300/20 rounded-lg cursor-pointer p-2`,
                activePath && 'bg-slate-400/20',
                isCollapsed && 'justify-center'
            )}
        >
            <Icon className="w-5 h-5" strokeWidth={1} />
            {!isCollapsed && <span>{label}</span>}
        </Link>
    );

    if (isCollapsed) {
        return (
            <TooltipProvider>
                <Tooltip>
                    <TooltipTrigger asChild>
                        {content}
                    </TooltipTrigger>
                    <TooltipContent side="right">
                        <p>{label}</p>
                    </TooltipContent>
                </Tooltip>
            </TooltipProvider>
        );
    }

    return content;
}