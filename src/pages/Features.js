import '../styles/Features.css';
import { useTranslation } from 'react-i18next';
import { CiHeart } from 'react-icons/ci';
import { useContext } from 'react';
import { LikeContext } from '../components/likedContext';

function Features(props) {
  const { likedIds } = useContext(LikeContext);
  const { t } = useTranslation();

  const userCards = props.cards;

  const likedCards = userCards.filter((card) => likedIds.includes(card.id));

  return (
    <div className='Features'>
      <div className='features-text'>
        <h1>{t('saralanganlar')}</h1>
      </div>

      <div className='features'>
        <div className='cards'>
          {likedCards.map((card) => (
            <div className='card' key={card.id}>
              <iframe
                autoPlay
                width='853'
                height='480'
                src='https://www.youtube.com/embed/FJBp4gKEkMg'
                title='Модульный дом'
                frameBorder='0'
                allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                referrerPolicy='strict-origin-when-cross-origin'
                allowFullScreen
              ></iframe>

              <div className='lineee' />
              <h1>{card.initInf}</h1>
              <div className='rentcardline' />
              <div className='card-h2'>
                <h2>{card.additInf}</h2>
              </div>
              <div className='rentcardline' />
              <h3>
                {t('price')}: {card.price}$
                <div className='priceline' />
                <span>{t('oyiga')}</span>
              </h3>
              <div className='rentcardline' />
              <h3>
                {t('phonenumber')}: {card.PhoneNumberInPanel}
              </h3>
              <div className='rentcardline' />
              <div className='rentcardicons'>
                <div className='rentcardiconanimation'>
                  <i>
                    <CiHeart />
                  </i>
                </div>
              </div>
            </div>
          ))}
        </div>

        {likedCards.length === 0 && (
          <p style={{ textAlign: 'center', marginTop: '20px' }}>
            {t('saralangan_yoq')}
          </p>
        )}
      </div>
    </div>
  );
}

export default Features;
