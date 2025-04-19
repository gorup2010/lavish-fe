import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-black text-white/80">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Lavish</h3>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-4">Support</h4>
            <ul className="space-y-2">
              <li>
                <Link to="#" className="hover:text-white">
                  Service & Repairs
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">
                  Warranty
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">
                  User Guides
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-white">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 mt-12 pt-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Lavish. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
