import AdminLayout from '../Repo/Components/adminPanel/AdminLayout'
import UserLayout from '../Repo/Components/UserLayout'
import '../styles/globals.css'
import { useRouter } from 'next/router'


export default function MyApp({ Component, pageProps }) {
  const router = useRouter();

  if (router.asPath.includes("admin")) {
    return (
      <AdminLayout>
        <Component {...pageProps} />
      </AdminLayout>
    )
  }
  else {
    return (
      <UserLayout>
        <Component {...pageProps} />
      </UserLayout>
    )
  }

}