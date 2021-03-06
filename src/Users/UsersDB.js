import ragnarPic from "./ProfilePictures/ragnar.png"
import lagerthaPic from "./ProfilePictures/Lagertha.jpg"
import bjornPic from "./ProfilePictures/bjorn.jpg"
import flokiPic from "./ProfilePictures/floki.jpg"
import rolloPic from "./ProfilePictures/rollo.jpg"
import ecbertPic from "./ProfilePictures/ecbert.jpg"


export const users = new Map();

//Hard-Coded Users
addNewUser("rag", "a1", "King Ragnar", ragnarPic);
addNewUser("lag", "a1", "Lagertha", lagerthaPic);
addNewUser("bjo", "a1", "Bjorn Lothbrok", bjornPic);
addNewUser("flo", "a1", "Floki", flokiPic);
addNewUser("rol", "a1", "Rollo", rolloPic);
addNewUser("ecb", "a1", "King Ecbert", ecbertPic);


export function addNewUser(user, pass, nick, pic) {
    users.set(user,
        {
            password: pass,
            nickname: nick,
            picture: pic
        });
}

export function doesUserExist(user) {
    if (users.get(user)) {
        return true;
    }
    return false;
}

export function getUserPassword(user) {
    if(doesUserExist(user)) {
        return users.get(user).password;
    }
    else return null;
}

export function getUserNickname(user) {
    if(doesUserExist(user)) {
        return users.get(user).nickname;
    }
    else return null;
}


export function getUserPicture(user) {
    if(doesUserExist(user)) {
        return users.get(user).picture;
    }
    else return null;
}

export function setProfilePicture(user, pic) {
    if(doesUserExist(user)) {
        users.get(user).picture = pic;
    }
}