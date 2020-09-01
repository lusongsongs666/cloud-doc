import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PropTypes from 'prop-types';
import FileSearch from "./FileSearch";

const BottomBtn = ({ text, colorClass, icon, onBtnClick }) => (
  <button
    type="button"
    className={`btn btn-block no-border ${colorClass}`}
    onClick={onBtnClick}
  >
    <FontAwesomeIcon
      className="mr-2"
      size="lg"
      icon={icon}
    />
    {text}
  </button>
);

BottomBtn.propTypes = {
  text: PropTypes.string,
  colorClass: PropTypes.string,
  icon: PropTypes.element.isRequired,
  onBtnClick: PropTypes.func
};

FileSearch.defaultProps = {
  text: '新建'
};

export default BottomBtn
