import { useState } from 'react';
import Modal from './components/Modal';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <main>
      <h1>React Forms</h1>
      <button onClick={() => setIsModalOpen(true)}>
        Open Uncontrolled Form
      </button>
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2>Uncontrolled Form</h2>
      </Modal>
    </main>
  );
}
export default App;
