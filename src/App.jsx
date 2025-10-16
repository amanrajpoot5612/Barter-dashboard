import UploadMediaPage from "./pages/UploadMediaPage.jsx";
import Navbar from './components/Navbar.jsx'
import  Page from './components/Page.jsx'
import ImagePage from './components/ImagePage.jsx'
import Testimonial from './components/Testimonial.jsx'
import Footer from './components/Footer.jsx'
import NavbarComponent from "./components/NavbarComponent.jsx";



const App = () => {
  return (
    <div className="app-component">
      {/* done */}
      <NavbarComponent></NavbarComponent>
      {/* done */}
      <Navbar></Navbar>
      {/* done */}
      <Page></Page>
      {/* done */}
      <ImagePage></ImagePage>
      {/* done */}
      <Testimonial></Testimonial>
      {/* done  */}
      <Footer></Footer>
      <UploadMediaPage></UploadMediaPage>
    </div>
  );
};

export default App;
