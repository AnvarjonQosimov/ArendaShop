import "../styles/Lease.css"
// import ArendaShop from "../images/ArendaShop.png"
import { useTranslation } from "react-i18next"

function Lease() {
  const { t } = useTranslation()
  return (
    <div className='Lease'>
      <div className="Lease">
        <div className="adminPanel">
          <div className="leasetext">
          <h1>{t('lease')}</h1>
          </div>
        <form action="">
            <div class="input-container">
        <input type="file" class="input-field" placeholder=" " id="video"/>
        <label htmlFor="video" class="input-label">{t('ivideo')}<span>{t('ivideopl')}</span></label>
    </div>

            <div className="lease-line"></div>

            <div class="input-container">
        <input type="text" class="input-field" placeholder=" " id="name" required/>
        <label htmlFor="name" class="input-label">{t('initalinf')}<span></span></label>
    </div>

            <div class="input-container">
        <input type="text" class="input-field" placeholder=" " id="optional" required/>
        <label htmlFor="optional" class="input-label">{t('additionalinf')}</label>
    </div>

            <div class="input-container">
        <input type="number" class="input-field" placeholder=" " id="price" required/>
        <label htmlFor="price" class="input-label">{t('price')}<span>{t('pricepl')}</span></label>
    </div>

            <div class="input-container">
        <input type="number" class="input-field" placeholder=" " id="number" required/>
        <label htmlFor="number" class="input-label">{t('phonenum')}</label>
    </div>

            <button type="submit">{t('savebtn')}</button>
        </form>
        </div>
    </div>
    </div>
  )
}

export default Lease
