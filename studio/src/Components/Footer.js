import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import NavbarComponent from './NavbarComponent';

function Footer() {
    return (
        <footer className="bg-dark text-center text-lg-start footer align-bottom">

            <div className="text-center p-2 text-light">

                <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
                    <i className="fa fa-phone"></i>
                </a>

                <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
                    <i className="fa fa-envelope"></i>
                </a>

                <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
                    <i className="fa fa-facebook"></i>
                </a>

                <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
                    <i className="fa fa-whatsapp"></i>
                </a>

                <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
                    <i className="fa fa-twitter"></i>
                </a>

                <a className="btn btn-outline-light btn-floating m-1" href="#!" role="button">
                    <i className="fa fa-youtube-play"></i>
                </a>

            </div>

            <div className="text-center text-light">
                <p>
                    11B, Biyanvila, Kadawatha
                </p>
            </div>

            <div className="text-center pt-0 pb-3 text-light">
                © 2021 Copyright | Studio Management
            </div>
        </footer>
    );
}

export default Footer;