import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

function Toggle() {
    const [isDark, setIsDark] = useState(() =>
        document.documentElement.classList.contains("dark")
    );

    const toggleDarkMode = () => {
        const html = document.documentElement;
        if (html.classList.contains("dark")) {
            html.classList.remove("dark");
            setIsDark(false);
            localStorage.theme = "light";
        } else {
            html.classList.add("dark");
            setIsDark(true);
            localStorage.theme = "dark";
        }
    };

    useEffect(() => {
        const userTheme = localStorage.theme;
        const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

        if (userTheme === "dark" || (!userTheme && systemPrefersDark)) {
            document.documentElement.classList.add("dark");
            setIsDark(true);
        } else {
            document.documentElement.classList.remove("dark");
            setIsDark(false);
        }
    }, []);

    return (
        <div className="min-h-screen flex items-center justify-center bg-white text-black dark:bg-black dark:text-white transition-all duration-300">
            <div className="space-y-4 text-center">
                <h1 className="text-3xl font-bold">Dark Mode Example</h1>
                <button
                    onClick={toggleDarkMode}
                    className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
                >
                    {isDark ? (
                        <Sun size={18} className="rotate-0 scale-100 transition-all" />
                    ) : (
                        <Moon size={18} className="rotate-0 scale-100 transition-all" />
                    )}
                    <span className="sr-only">Toggle theme</span>
                </button>
            </div>
        </div>
    );
}

export default Toggle;
