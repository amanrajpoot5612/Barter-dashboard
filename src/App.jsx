import Media from "./components/Media.jsx";
import UploadMediaPage from "./pages/UploadMediaPage.jsx";
import Navbar from './components/Navbar.jsx'
import  Home from './components/Home.jsx'
import ContentPage from './components/ContentPages.jsx'
import ImagePage from './components/ImagePage.jsx'
import Testimonial from './components/Testimonial.jsx'
import Footer from './components/Footer.jsx'


const App = () => {
  return (
    <div className="app-component">
      <Navbar></Navbar>
      <Home></Home>
      <ContentPage></ContentPage>
      <ImagePage></ImagePage>
      <Testimonial></Testimonial>
      <Footer></Footer>

      {/* <Media></Media>
      <UploadMediaPage></UploadMediaPage> */}
    </div>
  );
};

export default App;
