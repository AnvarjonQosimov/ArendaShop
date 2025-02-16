import "../styles/Contact.css";
import { FaPhoneAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { FaTelegram } from "react-icons/fa";

function Contact() {
  const { t } = useTranslation();
  return (
    <div className="Contact">
      <div className="left">
        <h1>
          {t("ijaragabering")} <span>!</span>
        </h1>
        <h1>
          {t("ijaragaoling")} <span>!</span>
        </h1>
      </div>
      <div className="contact-line" />
      <div className="right">
        <h1>
          {t("aloqa")}
        </h1>
        <div className="aloqa-line" />
        <a href="tel:+998935755102">
          <span>
            <FaPhoneAlt />
          </span>{" "}
          +998(93)-575-51-02
        </a>
        <a href="https://t.me/@anvarjonweb001">
          <span>
            <FaTelegram />
          </span>{" "}
          anvarjonweb001
        </a>
      </div>
    </div>
  );
}

export default Contact;

// {
//    <div className="helpos">
//         <h1>{t('helpos')}</h1>
//       </div>
//       <div className="Help">
//         <h1>{t('helpteleg')} <a href="https://t.me/@anvarjonweb001">@ <div className="circlee"></div></a></h1>
//         <h2>{t('helpand')}</h2>
//         <h1>{t('helptel')} <a href="tel:+998935755102"><i><FaPhoneAlt /></i> <div className="circlee"></div></a></h1>
//       </div> 
// }
