import { useState } from 'react';
import { Button } from "../atoms/Button";
import { ContactForm } from "./FormFooter";

// Modal component
const Modal = ({ onClose }: { onClose: () => void }) => (
  <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50 z-50">
    <div className="bg-white rounded-lg p-4 w-full max-w-lg">
      <ContactForm onClose={onClose} />
    </div>
  </div>
);

const ButtonBeriSaran = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Function to open the modal
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {/* Button that triggers modal */}
      <Button onClick={openModal} variant="primary">
        Berikan Saran
      </Button>

      {/* Conditionally render the modal */}
      {isModalOpen && <Modal onClose={closeModal} />}
    </div>
  );
};

export default ButtonBeriSaran;
