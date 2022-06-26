import AdminLayout from "../Repo/Components/Admin/AdminLayout";
import UserLayout from "../Repo/Components/User/UserLayout";
import "../styles/globals.css";
import { useRouter } from "next/router";
import API from "../Repo/Context/Global/API";

export default function MyApp({ Component, pageProps, admin }) {
  const router = useRouter();

  if (router.asPath.includes("admin")) {
    return (
      <API>
        <AdminLayout>
          <Component {...pageProps} />
        </AdminLayout>
      </API>
    );
  } else {
    return (
      <API>
        <UserLayout>
          <Component {...pageProps} />
        </UserLayout>
      </API>
    );
  }
}
