import React from 'react';
import { useState } from 'react';

export const Currency = () => {
  const [isOpen, setIsOpen] = useState(false);
  console.log(isOpen);
  return (
    <div className="content">
      <div className="currency__block">
        <div className="dropdown__currency">
          <div onClick={() => setIsOpen((prev) => !prev)} className="current__select">
            <span>1</span>
            <img
              className={`${isOpen ? 'arrow_active' : null}`}
              src="./img/arrow.svg"
              alt="arrow"
            />
          </div>
          <div className={`dropdown__menu menu__from`}>
            <ul>
              <li>
                <div className="currency__text">
                  <p className="currency__code">1</p>
                  <p className="currency__name">1</p>
                </div>
                <div className="currency__index">
                  <p className="price">1</p>
                  {/* <img
                    width={10}
                    height={10}
                    src={`${
                      item.Value / item.Nominal > item.Previous / item.Nominal
                        ? './img/up.svg'
                        : './img/down.svg'
                    }`}
                    alt="up or down"
                  /> */}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};
