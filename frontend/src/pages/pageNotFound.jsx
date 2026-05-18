import React from "react";
import { Link } from "react-router-dom";

function PageNotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 flex items-center justify-center px-6">
      
      <div className="text-center max-w-xl">

        {/* 404 Text */}
        <p className="text-8xl sm:text-9xl font-extrabold text-red-600 drop-shadow-lg">
          404
        </p>

        {/* Title */}
        <h2 className="mt-4 text-3xl sm:text-4xl font-bold text-white">
          Page Not Found
        </h2>

        {/* Description */}
        <p className="mt-4 text-slate-300 text-sm sm:text-base leading-relaxed">
          Sorry, the page you are looking for does not exist or has been moved.
          Please check the URL or return back to the homepage.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
          
          <Link
            to="/"
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 text-white font-semibold shadow-lg"
          >
            Go Home
          </Link>

          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 rounded-xl border border-slate-600 hover:border-slate-400 transition-all duration-300 text-slate-200 font-semibold"
          >
            Go Back
          </button>

        </div>

      </div>
    </div>
  );
}

export default PageNotFound;