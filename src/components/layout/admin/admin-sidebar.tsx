import { useLogout } from "@/hooks/use-logout";
import { List, SquareUserRound, Watch } from "lucide-react";
import { FC } from "react";
import { Link, useLocation } from "react-router-dom";

function urlMatch(pageToMatch: string, url: string) {
  if (pageToMatch === "users") {
    const reg1 = /\/admin(\/)*$/;
    const regStr = `\\/admin\\/users((\\/)*$|\\/\\w)`;
    const reg2 = new RegExp(regStr);
    return reg1.test(url) || reg2.test(url);
  } else {
    const regStr = `\\/admin\\/${pageToMatch}((\\/)*$|\\/\\w)`;
    const reg = new RegExp(regStr);
    return reg.test(url);
  }
}

const AdminSidebar: FC = () => {
  const location = useLocation();
  const { logout, isPending } = useLogout();

  return (
    <div>
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen transition-transform translate-x-0 bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <Link to="/" className="h-40 flex items-center justify-center text-5xl font-extralight">Lavish</Link>
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            <li>
              <Link
                to="users"
                className={`flex items-center p-2 text-gray-500 rounded-md group ${
                  urlMatch("users", location.pathname)
                    ? `bg-gray-900 text-white`
                    : `hover:bg-gray-100 hover:text-gray-900`
                } group`}
              >
                <SquareUserRound
                  className={`w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 ${
                    urlMatch("users", location.pathname)
                      ? ` text-white`
                      : `group-hover:text-gray-900 `
                  } `}
                />

                <span className="flex-1 ms-3 whitespace-nowrap">Users</span>
              </Link>
            </li>

            <li>
              <Link
                to="products"
                className={`flex  items-center p-2 text-gray-500 rounded-lg  group ${
                  urlMatch("products", location.pathname)
                    ? `bg-gray-900 text-white`
                    : `hover:bg-gray-100 hover:text-gray-900`
                } group`}
              >
                <Watch
                  className={`w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 ${
                    urlMatch("products", location.pathname)
                      ? ` text-white`
                      : `group-hover:text-gray-900 `
                  } `}
                />

                <span className="flex-1 ms-3 whitespace-nowrap">Products</span>
              </Link>
            </li>

            <li>
              <Link
                to="categories"
                className={`flex items-center p-2 text-gray-500 rounded-lg  group ${
                  urlMatch("categories", location.pathname)
                    ? `bg-gray-900 text-white`
                    : `hover:bg-gray-100 hover:text-gray-900`
                } group`}
              >
                <List
                  className={`w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 ${
                    urlMatch("categories", location.pathname)
                      ? ` text-white`
                      : `group-hover:text-gray-900 `
                  } `}
                />

                <span className="ms-2">Categories</span>
              </Link>
            </li>

          </ul>
        </div>
      </aside>
    </div>
  );
};

export default AdminSidebar;
