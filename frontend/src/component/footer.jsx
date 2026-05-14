import React from "react";

function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-4 mt-auto">
            <div className="container mx-auto text-center">
                <p className="text-sm">
                    © 2026 All Rights Reserved
                </p>

                <p className="text-xs text-gray-400 mt-1">
                    Built with React & FastAPI
                </p>
            </div>
        </footer>
    );
}

export default Footer;