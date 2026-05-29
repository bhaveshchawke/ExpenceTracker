import { FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export const Footer = () => {
  return (
    // mt-auto यह सुनिश्चित करता है कि अगर पेज में कंटेंट कम हो, तो भी फुटर हमेशा नीचे चिपका रहे
    <footer className="bg-slate-100 border-t border-gray-200 mt-auto">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Top Section: Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* 1. Brand & Description */}
          <div className="col-span-1 md:col-span-1">
            <div className="text-xl font-bold tracking-tight text-gray-900 select-none">
              Kharcha<span className="text-indigo-600">Pani</span>
            </div>
            <p className="mt-4 text-sm text-gray-500 leading-relaxed">
              Your personal finance manager. Track your expenses, manage
              budgets, and achieve your financial goals effortlessly.
            </p>
          </div>

          {/* 2. Quick Links */}
          <div>
            <h3 className="text-xs font-semibold text-gray-900 tracking-wider uppercase">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3">
              <li>
                <a
                  href="/"
                  className="text-sm text-gray-500 transition-colors hover:text-indigo-600"
                >
                  Dashboard
                </a>
              </li>
              <li>
                <a
                  href="/transactions"
                  className="text-sm text-gray-500 transition-colors hover:text-indigo-600"
                >
                  Transactions
                </a>
              </li>
              <li>
                <a
                  href="/budgets"
                  className="text-sm text-gray-500 transition-colors hover:text-indigo-600"
                >
                  Budgets
                </a>
              </li>
            </ul>
          </div>

          {/* 3. Connect / Socials */}
          <div>
            <h3 className="text-xs font-semibold text-gray-900 tracking-wider uppercase">
              Connect with Developer
            </h3>
            <p className="mt-4 text-sm text-gray-500 mb-4">
              Have questions or suggestions? Reach out on social media.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="#"
                className="p-2 text-gray-400 transition-colors bg-gray-50 rounded-full hover:bg-indigo-50 hover:text-indigo-600"
              >
                <FaGithub className="text-lg" />
              </a>
              <a
                href="#"
                className="p-2 text-gray-400 transition-colors bg-gray-50 rounded-full hover:bg-indigo-50 hover:text-indigo-600"
              >
                <FaLinkedin className="text-lg" />
              </a>
              <a
                href="#"
                className="p-2 text-gray-400 transition-colors bg-gray-50 rounded-full hover:bg-indigo-50 hover:text-indigo-600"
              >
                <FaXTwitter className="text-lg" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section: Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center mt-10 pt-6 border-t border-gray-100">
          <p className="text-sm text-gray-400">
            © 2026 KharchaPani. All rights reserved.
          </p>
          <p className="text-sm text-gray-400 mt-2 md:mt-0 font-medium">
            Crafted with <span className="text-indigo-600">♥</span> by Bhavesh
          </p>
        </div>
      </div>
    </footer>
  );
};
