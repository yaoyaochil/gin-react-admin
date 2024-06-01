import {
    message as antdMessage,
    notification as antdNotification,
    Modal as antdModal,
    App,
} from "antd";

import type { MessageInstance } from "antd/es/message/interface";
import type { NotificationInstance } from "antd/es/notification/interface";
import type { ModalStaticFunctions } from "antd/es/modal/confirm";

let message: MessageInstance = antdMessage;
let notification: NotificationInstance = antdNotification;

// because warn is deprecated, so we need to remove it.
const { ...resetFns } = antdModal;
let modal: Omit<ModalStaticFunctions, "warn"> = resetFns;

/**
 * This component is used to escape the antd's static functions.
 */
function EscapeAntd() {
    const staticFunctions = App.useApp();

    message = staticFunctions.message;
    notification = staticFunctions.notification;
    modal = staticFunctions.modal;

    return null;
}

export {
    message,
    notification,
    modal,
}

export default EscapeAntd;