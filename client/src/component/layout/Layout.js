import Header from './Header';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';

export default function Layout({children}) {
  return (
    <div className='container-fluid'>
        <Header />
            <main style={{minHeight:"73vh"}}>
                <Toaster />
                {children}
            </main>
        <Footer />
    </div>
  )
}
