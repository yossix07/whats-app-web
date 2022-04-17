import { useRef, useState } from "react";
import { addVideoMessage, addTextMessage, addPictureMessage } from "../../UsersChatDB";
import $ from "jquery";
import InvalidFileModal from "../../InvalidFileModal";

function SendMsgBar(props) {

    const btnId = props.myUser.concat("-").concat(props.username);

    const textMsg = useRef("");

    $(document).ready(function (event) {
        $("#".concat(btnId).concat("-msg")).unbind("click").on("click", function () {
            const date = new Date();
            let time = date.getHours() + ":" + date.getMinutes();
            addTextMessage(props.myUser, props.username, textMsg.current.value, time);
            props.refreshChat();
            textMsg.current.value = "";
        })

    })

    const selectPic = () => {
        document.getElementById(btnId.concat("-img-input")).click();
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

    const [modalText, setModalText] = useState(""); 

    const showModal = () => {
        setIsModelOpen(true);
    };
    const hideModal = () => {
        setIsModelOpen(false);
    };

    const sendPic = (e) => {
        if (validatePic(e.target.files[0])) {
            const date = new Date();
            let time = date.getHours() + ":" + date.getMinutes();
            addPictureMessage(props.myUser, props.username, e.target.files[0], time);
            props.refreshChat();
        }
        else {
            setModalText("Picture format must be one of the above: jpg/jpeg/png/svg");
            showModal();
        }
    }

    const validateVid = (vid) => {
        var fileName = vid.name;
        var idxDot = fileName.lastIndexOf(".") + 1;
        var extFile = fileName.substr(idxDot, fileName.length).toLowerCase();

        if (extFile == "mp4" || extFile == "mkv" || extFile == "avi" || extFile == "wmv" || extFile == "mov" || extFile == "flv") {
            return true;
        }
        return false;
    }

    const selectVideo = () => {
        document.getElementById(btnId.concat("-vid-input")).click();
    }

    const sendVideo = (e) => {
        if (validateVid(e.target.files[0])) {
            const date = new Date();
            let time = date.getHours() + ":" + date.getMinutes();
            addVideoMessage(props.myUser, props.username, e.target.files[0], time);
            props.refreshChat();
        } else {
            setModalText("Video format must be one of the above: mp4/mkv/avi/wmv/mov/flv");
            showModal();
        }
    }

    return (
        <>
        <InvalidFileModal isOpen={isModelOpen} hideModal={hideModal} text={modalText}></InvalidFileModal>
        <div className="card-footer">
            <div className="input-group">
                <div className="input-group-append">
                    <button type="button" className="btn btn-outline-secondary input-group-text record_btn"><i className="bi bi-mic"></i></button>
                </div>

                <div className="input-group-append">
                    <button id={btnId.concat("-img-btn")} type="button" onClick={selectPic} className="btn btn-outline-secondary input-group-text attach_img_btn" ><i className="bi bi-image"></i></button>
                    <input id={btnId.concat("-img-input")} onChange={sendPic} type="file" accept="image/*" hidden></input>
                </div>
                <div className="input-group-append">
                    <button id={btnId.concat("-vid-btn")} type="button" onClick={selectVideo} className="btn btn-outline-secondary input-group-text attach_video_btn"><i className="bi bi-camera-reels"></i></button>
                    <input id={btnId.concat("-vid-input")} onChange={sendVideo} type="file" accept="video/*" hidden ></input>
                </div>
                <input className="type_msg form-control" ref={textMsg} placeholder="Type your message..."></input>
                <div className="input-group-append">
                    <button id={btnId.concat("-msg")} type="button" className="btn btn-outline-secondary input-group-text send_btn" ><i className="bi bi-envelope"></i></button>
                </div>
            </div>
        </div>
        </>
    );
}

export default SendMsgBar;