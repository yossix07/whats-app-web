import Modal from "react-bootstrap/Modal";
import { setProfilePicture } from "../UsersDB";
import InvalidFileModal from "../InvalidFileModal";
import {useState} from "react";

function ProfilePicModal(props) {

    const selectPicture = () => {
        document.getElementById(("profilePicInput")).click();
    }

    const changeProfilePicture = (e) => {
        props.hideModal();

        if(validatePic(e.target.files[0])) {
            setProfilePicture(props.myUser, URL.createObjectURL(e.target.files[0]));
        } else {
            showError();
        }
    }

    const validatePic = (pic) => {
        console.log(pic)
        var fileName = pic.name;
        var idxDot = fileName.lastIndexOf(".") + 1;
        var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();

        if (extFile == "jpg" || extFile == "jpeg" || extFile == "png" || extFile == "svg") {
            return true;
        }
        return false;
    }

    const [isModelOpen, setIsModelOpen] = useState(false);

    const showError = () => {
        setIsModelOpen(true);
    };
    const hideError = () => {
        setIsModelOpen(false);
    };

    return (
        <>
        <InvalidFileModal isOpen={isModelOpen} hideModal={hideError} text = "Picture format must be one of the above: jpg/jpeg/png/svg"></InvalidFileModal>
        <Modal show={props.isOpen} onHide={props.hideModal}>
            <Modal.Header>
                <Modal.Title>Profile Picture Change</Modal.Title>
            </Modal.Header>
            <Modal.Body> click on the button to change profile picture! </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-outline-dark" onClick={selectPicture}>Choose Picture</button>
                <input id="profilePicInput" type="file" accept="image/*" onChange={changeProfilePicture} hidden></input>
                <button className="btn btn-outline-dark" onClick={props.hideModal}>Cancel</button>
            </Modal.Footer>
        </Modal>
        </>
    );
}

export default ProfilePicModal;