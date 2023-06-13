import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';

const Gears = React.forwardRef(({onClick}, ref) => (
    <i
     className="fa-solid fa-gears"
     ref={ref}
     onClick={(e) => {
        e.preventDefault();
        onClick(e);
     }}
    />
));

export const MoreDropdown = () => {
    return (
        <Dropdown>
        <Dropdown.Toggle as={Gears} id="dropdow-custom-components">
            Custom toggle
        </ Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item
          >
            <i className="fas fa-edit" />
          </Dropdown.Item>
          <Dropdown.Item
                      >
            <i className="fas fa-trash-alt" />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    )
}