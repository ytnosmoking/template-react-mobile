import React from 'react';

import './index.less';

const SvgIcon = ({ iconClass, className }) => {
  const styleExternalIcon = {
    mask: `url(${iconClass}) no-repeat 50% 50%`,
    WebkitMask: `url(${iconClass}) no-repeat 50% 50%`,
  };

  const isExternal = (path) => /^(https?:|mailto:|tel:)/.test(path);

  const svgClass = className ? 'svg-icon ' + className : 'svg-icon';

  const iconName = `#icon-${iconClass}`;

  return (
    <div>
      {isExternal(iconClass) ? (
        <div
          style={styleExternalIcon}
          className={`svg-external-icon ${svgClass}`}
        />
      ) : (
        <svg className={svgClass} aria-hidden="true">
          <use xlinkHref={iconName} />
        </svg>
      )}
    </div>
  );
};

export default SvgIcon;
