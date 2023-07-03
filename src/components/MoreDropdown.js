import React, { useState } from "react";
import Dropdown from "react-bootstrap/Dropdown";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import styles from "../styles/MoreDropdown.module.css";
import btnStyles from "../styles/Button.module.css";
import { useHistory } from "react-router-dom";

const Gears = React.forwardRef(({ onClick }, ref) => (
  <i
    className="fa-solid fa-gears"
    ref={ref}
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  />
));

export const MoreDropdown = ({ handleEdit, handleDelete }) => {
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleDeleteClick = () => {
    setShowDeleteConfirmation(true);
  };

  const handleDeleteConfirm = () => {
    handleDelete();
    setShowDeleteConfirmation(false);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirmation(false);
  };

  return (
    <>
      <Dropdown className="ml-auto" drop="left">
        <Dropdown.Toggle as={Gears} />

        <Dropdown.Menu
          className="text-center"
          popperConfig={{ strategy: "fixed" }}
        >
          <Dropdown.Item
            className={styles.DropdownItem}
            onClick={handleEdit}
            aria-label="edit"
          >
            <i className="fas fa-edit" />
          </Dropdown.Item>
          <Dropdown.Item
            className={styles.DropdownItem}
            onClick={handleDeleteClick}
            aria-label="delete"
          >
            <i className="fas fa-trash-alt" />
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Modal
        show={showDeleteConfirmation}
        onHide={handleDeleteCancel}
        centered
      >
        <Modal.Header className={styles.CustomModal}>
          <Modal.Title><strong>Confirm Deletion</strong></Modal.Title>
        </Modal.Header>
        <Modal.Body className={styles.CustomModal}>Are you sure you want to delete this?</Modal.Body>
        <Modal.Footer className="justify-content-center">
          <Button className={`${btnStyles.Button} ${btnStyles.Dull}`} onClick={handleDeleteCancel}>
            No, go back
          </Button>
          <Button className={`${btnStyles.Button} ${btnStyles.Dull}`} variant="danger" onClick={handleDeleteConfirm}>
            Yes, delete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export const ProfileEditDropdown = ({ id }) => {
  const history = useHistory();
  return (
    <Dropdown className={`ml-auto px-3 ${styles.Absolute}`} drop="left">
      <Dropdown.Toggle as={Gears} />
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit`)}
          aria-label="edit-profile"
        >
          <i className="fas fa-edit" /> edit profile
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/username`)}
          aria-label="edit-username"
        >
          <i className="far fa-id-card" />
          change username
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => history.push(`/profiles/${id}/edit/password`)}
          aria-label="edit-password"
        >
          <i className="fas fa-key" />
          change password
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );
};
