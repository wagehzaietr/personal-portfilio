import Header from './Header';
import Footer from './Footer';
import FloatingSocial from '../ui/FloatingSocial';

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <FloatingSocial />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 