import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, Mail, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CustomButton } from "@/components/ui/custom-button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/components/auth/AuthProvider";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface HeaderProps {
    isSignInOpen: boolean;
    setIsSignInOpen: (open: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({ isSignInOpen, setIsSignInOpen }) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const { login, logout, isAuthenticated } = useAuth();
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location.pathname]);

    const handleSignIn = async (e?: React.FormEvent) => {
        if (e) e.preventDefault();
        setIsLoading(true);
        setError("");
        try {
            const result = await login(email, password);
            if (result.success) {
                setIsSignInOpen(false);
            } else {
                setError(result.message);
            }
        } catch {
            setError("An error occurred during sign in");
        } finally {
            setIsLoading(false);
        }
    };

    const menuItems = [
        { name: "Home", path: "/", dropdown: [] },
        {
            name: "Services",
            path: "/services",
            dropdown: [
                { name: "Consulting", path: "/services/consulting" },
                { name: "Case Review", path: "/services/case-review" },
                { name: "AI Tools", path: "/services/ai-tools" },
            ],
        },
        { name: "Chat", path: "/chat", dropdown: [] },
        {
            name: "About",
            path: "/about",
            dropdown: [
                { name: "Our Team", path: "/about/team" },
                { name: "Mission", path: "/about/mission" },
                { name: "Careers", path: "/about/careers" },
            ],
        },
        { name: "Contact", path: "/contact", dropdown: [] },
    ];

    const isActive = (path: string) => location.pathname === path;

    return (
        <header
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
                isScrolled ? "bg-[#7B1E2B] shadow-lg" : "bg-[#A32B3E]"
            )}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
                {/* Logo */}
                <Link to="/" className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-black">LEXX.iA</span>

                </Link>

                {/* Center title */}
                <span className="text-2xl font-bold tracking-widest text-black">
                    LEGAL.<span className="text-white">Ai</span>
                </span>

                {/* Desktop nav */}
                <nav className="hidden md:flex items-center space-x-6">
                    {menuItems.map((item) => (
                        <div
                            key={item.name}
                            className="relative group"
                            onMouseEnter={() => setOpenDropdown(item.name)}
                            onMouseLeave={() => setOpenDropdown(null)}
                        >
                            <Link
                                to={item.path}
                                className={cn(
                                    "px-4 py-2 font-medium text-white hover:bg-[#3B0E0E] transition-colors flex items-center",
                                    isActive(item.path) ? "bg-[#3B0E0E]" : ""
                                )}
                            >
                                {item.name}
                                {item.dropdown.length > 0 && <ChevronDown className="ml-1 h-4 w-4" />}
                            </Link>

                            {/* Dropdown */}
                            {item.dropdown.length > 0 && openDropdown === item.name && (
                                <div className="absolute left-0 mt-1 w-48 bg-[#3B0E0E] shadow-lg rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                                    {item.dropdown.map((sub) => (
                                        <Link
                                            key={sub.path}
                                            to={sub.path}
                                            className="block px-4 py-2 text-white hover:bg-[#5C1B1B] transition-colors"
                                        >
                                            {sub.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}

                    {/* Login */}
                    {isAuthenticated ? (
                        <CustomButton
                            variant="ghost"
                            size="sm"
                            className="text-white hover:bg-[#3B0E0E]"
                            onClick={logout}
                        >
                            Logout
                        </CustomButton>
                    ) : (
                        <Dialog open={isSignInOpen} onOpenChange={setIsSignInOpen}>
                            <DialogTrigger asChild>
                                <CustomButton variant="ghost" size="sm" className="text-white hover:bg-[#3B0E0E]">
                                    Login
                                </CustomButton>
                            </DialogTrigger>
                            <DialogContent className="bg-[#3B0E0E] border-none">
                                <DialogHeader>
                                    <DialogTitle className="text-white">Sign In</DialogTitle>
                                </DialogHeader>
                                <form className="grid gap-4 py-4" onSubmit={handleSignIn}>
                                    <div>
                                        <Label htmlFor="email" className="text-white">Email</Label>
                                        <Input
                                            id="email"
                                            type="text"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="bg-[#5C1B1B] text-white"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="password" className="text-white">Password</Label>
                                        <Input
                                            id="password"
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="bg-[#5C1B1B] text-white"
                                        />
                                    </div>
                                    {error && <p className="text-red-400">{error}</p>}
                                    <CustomButton type="submit" className="bg-[#A32B3E] text-white">
                                        {isLoading ? "Signing in..." : "Sign In"}
                                    </CustomButton>
                                </form>
                            </DialogContent>
                        </Dialog>
                    )}
                </nav>

                {/* Mobile menu button */}
                <Button
                    variant="ghost"
                    size="icon"
                    className="md:hidden text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </Button>
            </div>

            {/* Mobile menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-[#3B0E0E] px-6 py-4 space-y-4">
                    {menuItems.map((item) => (
                        <div key={item.name}>
                            <Link
                                to={item.path}
                                className="block px-4 py-2 text-white font-medium"
                            >
                                {item.name}
                            </Link>
                            {item.dropdown.length > 0 && (
                                <div className="pl-4 space-y-1">
                                    {item.dropdown.map((sub) => (
                                        <Link
                                            key={sub.path}
                                            to={sub.path}
                                            className="block text-sm text-gray-300"
                                        >
                                            {sub.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}
        </header>
    );
};

export default Header;

