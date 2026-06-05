import { useState, useRef } from 'react';

import { useAppSelector } from './store/hooks';

import Modal from './components/Modal';
import UncontrolledForm from './forms/UncontrolledForm/UncontrolledForm';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);

  const submissions = useAppSelector((state) => state.forms.submissions);

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
        <UncontrolledForm />
      </Modal>
      <section>
        <h2>Submitted forms</h2>
        {submissions.length === 0 ? (
          <p>No submissions yet</p>
        ) : (
          submissions.map((submission) => (
            <article key={submission.id}>
              <img
                src={submission.imageBase64}
                alt={submission.name}
                width="120"
              />
              <h3>{submission.name}</h3>
              <p>Age:{submission.age}</p>
              <p>Email:{submission.email}</p>
              <p>Gender:{submission.gender}</p>
              <p>Country:{submission.country}</p>
            </article>
          ))
        )}
      </section>
    </main>
  );
}
export default App;
