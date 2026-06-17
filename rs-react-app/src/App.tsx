import { useRef, useState } from 'react';

import { useAppSelector } from './store/hooks';
import SubmissionCard from './components/SubmissionCard/SubmissionCard';
import Modal from './components/Modal';
import UncontrolledForm from './forms/UncontrolledForm/UncontrolledForm';
import ReactHookForm from './forms/ReactHookForm/ReactHookForm';

import { StyledCards, StyledSubmissions } from './Submissions.styled';
import { StyledMain, StyledButton } from './App.styled';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReactHookFormOpen, setIsReactHookFormOpen] = useState(false);

  const openButtonRef = useRef<HTMLButtonElement>(null);
  const submissions = useAppSelector((state) => state.forms.submissions);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    openButtonRef.current?.focus();
  };

  const handleCloseReactHookForm = () => {
    setIsReactHookFormOpen(false);
  };

  return (
    <StyledMain>
      <h1>React Forms</h1>

      <StyledButton ref={openButtonRef} onClick={() => setIsModalOpen(true)}>
        Open Uncontrolled Form
      </StyledButton>

      <StyledButton onClick={() => setIsReactHookFormOpen(true)}>
        Open React Hook Form
      </StyledButton>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <UncontrolledForm onSuccess={handleCloseModal} />
      </Modal>

      <Modal isOpen={isReactHookFormOpen} onClose={handleCloseReactHookForm}>
        <ReactHookForm onSuccess={handleCloseReactHookForm} />
      </Modal>

      <StyledSubmissions>
        <h2>Submitted Forms ({submissions.length})</h2>

        <StyledCards>
          {submissions.map((submission) => (
            <SubmissionCard key={submission.id} submission={submission} />
          ))}
        </StyledCards>
      </StyledSubmissions>
    </StyledMain>
  );
}

export default App;
