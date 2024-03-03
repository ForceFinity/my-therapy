import Modal, { Styles } from "react-modal";
import { KeyboardEvent, MouseEvent } from "react";

const styles: Styles = {
    content: {
        width: "55vw",
        height: "60vh",
        backgroundColor: "#fff",
        margin: "auto",
        borderRadius: "1rem"
    },
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.4)"
    }
}

interface EventModalProps {
    modalIsOpen: boolean,
    onCloseModal?: (e: KeyboardEvent | MouseEvent) => void
    className?: string
}

export const EventModal = ({modalIsOpen, onCloseModal, className}: EventModalProps) => {
    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={onCloseModal}
            contentLabel="Example Modal"
            style={styles}
        >
            
        </Modal>
    )
}