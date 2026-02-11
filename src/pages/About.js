import "../styles/About.css"
import { useTranslation } from "react-i18next"

function About() {
  const { t } = useTranslation()
  return (
    <div className='About'>
      <div className="lines_circles">
        <div className="linees">
            <div className="linee"></div>
        </div>

        <div className="circle_line">
            <div className="circles">
            <div className="circle">1</div>
            </div>
            <div className="lines">
            <div className="line"></div>
            </div>
        </div>
        
        <div className="linees">
            <div className="linee"></div>
        </div>

        <div className="circle_line">
            <div className="circles">
            <div className="circle">2</div>
            </div>
            <div className="lines">
            <div className="line"></div>
            </div>
        </div>

        <div className="linees">
            <div className="linee"></div>
        </div>

        <div className="circle_line">
            <div className="circles">
            <div className="circle">3</div>
            </div>
            <div className="lines">
            <div className="line"></div>
            </div>
        </div>

        <div className="linees">
            <div className="linee"></div>
        </div>

      </div>
      <div className="textt">
      <div className="text">
        <h1>{t('onSite1')}</h1>
        <h1>{t('onSite2')}</h1>
        <h1>{t('onSite3')}</h1>
      </div>
      </div>
      </div>
  )
}

export default About
