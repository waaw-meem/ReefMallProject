import React from 'react';
import style from './index.module.scss';
import Heading from '../Common/Heading';
import Image from 'next/image';

type PrivacyPolicyProps = {
  desc?: string;
};

const PrivacyPolicyPage = ({ desc }: PrivacyPolicyProps) => {
  return (
    <div className={`section ${style.policiesSection}`}>
      <div className="bg-wrapper-custom">
        <div className="gred"></div>
        <Image src="/assets/images/policy/bgImage.png" alt="bg-img" width={1920} height={1559} />
      </div>
      <div className="container">
        <div className={style.policyPoint}>
          <div className={`custom-richText-Style ${style.richText}`} dangerouslySetInnerHTML={{ __html: desc ? desc : '' }}></div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
