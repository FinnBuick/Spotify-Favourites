import React from "react";

const Tab = (props) => {
    return (
        <li className={`${props.isActive ? 'uk-active' : ''}`}>
            <a className={`${props.linkClassName} `}
                onClick={(event) => {
                    event.preventDefault();
                    props.onClick(props.tabIndex);
                }}>
                {props.tabText}
            </a>
        </li>
    )
}

export default Tab;
