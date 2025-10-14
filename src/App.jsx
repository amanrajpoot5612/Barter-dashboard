import Media from "./components/Media.jsx";
import UploadMediaPage from "./pages/UploadMediaPage.jsx";
import Navbar from './components/Navbar.jsx'
import  Page from './components/Page.jsx'
import ContentPage from './components/ContentPages.jsx'
import ImagePage from './components/ImagePage.jsx'
import Testimonial from './components/Testimonial.jsx'
import Footer from './components/Footer.jsx'
import NavbarComponent from "./components/NavbarComponent.jsx";
import FormComponent from "./components/FormComponent.jsx";



const App = () => {
  return (
    <div className="app-component">
      <NavbarComponent></NavbarComponent>
      <Navbar></Navbar>
      {/* <FormComponent></FormComponent> */}
      <Page></Page>
      <ImagePage></ImagePage>
      <Testimonial></Testimonial>
      <Footer></Footer>
      <UploadMediaPage></UploadMediaPage>
      {/* <ImagePage></ImagePage> */}
      {/* <Media></Media> */}
      {/* <UploadMediaPage></UploadMediaPage> */}
    </div>
  );
};

export default App;
