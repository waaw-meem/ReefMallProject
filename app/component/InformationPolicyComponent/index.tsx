import React from 'react';
import style from "./index.module.scss";

type PolicyProps = {
  points?: string;
}

const InformationPolicyComponent = ({ points }: PolicyProps) => {

  return (
    <section className='section bg-white'>
      <div className="container">
        <div className={`primary_header ${style.privacySection}`}>
          {/* <h2 className={`h2 fw-500`}>Information covered by this Policy</h2> */}
          <div className={style.informationPolicyContent}>
            {/* <ul>
              {points?.map((item, index) => (
                <li key={index} className={`fw-500 ${style.para} ${index === 0 ? 'first-item-style' : ''} ${index === 0 ? 'mb-2 mt-35' : ''}`}>{item?.list}</li>
              ))}
            </ul> */}
            <div className={`fw-500 ${style.para}`} dangerouslySetInnerHTML={{ __html: points ? points : '' }}></div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default InformationPolicyComponent;
