import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CreditCard, LogOutIcon, HomeIcon, SettingsIcon, MenuIcon } from "lucide-react";


import Link from "next/link";


export function UserNav() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-5 w-5 rounded-full">
                    <MenuIcon className="w-5 h-5" />
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none"></p>
                        <p className="text-xs leading-none text-muted-foreground">
                          
                        </p>
                    </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <Link
                                href=""
                                className="w-full flex justify-between items-center"
                            >
                                <span>

                                </span>
                            </Link>
                        </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />

                <DropdownMenuItem
                    className="w-full flex justify-between items-center"
                    asChild
                >
                    
                        Logout{" "}
                        <span>
                            <LogOutIcon className="w-4 h-4" />
                        </span>
                    
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}