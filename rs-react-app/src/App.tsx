import { useState, useRef } from 'react';

import Modal from './components/Modal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    openButtonRef.current?.focus();
  };

  return (
    <main>
      <h1>React Forms</h1>
      <button ref={openButtonRef} onClick={() => setIsModalOpen(true)}>
        Open Uncontrolled Form
      </button>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Uncontrolled Form</h2>
      </Modal>
    </main>
  );
}
export default App;
