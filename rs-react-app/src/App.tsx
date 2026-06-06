import { useState, useRef } from 'react';

import { useAppSelector } from './store/hooks';
import { useEffect } from 'react';
import { markSubmissionAsSeen } from './store/formsSlice';
import { useAppDispatch } from './store/hooks';
import Modal from './components/Modal';
import UncontrolledForm from './forms/UncontrolledForm/UncontrolledForm';
import ReactHookForm from './forms/ReactHookForm/ReactHookForm';

import {
  StyledCards,
  StyledSubmissions,
  StyledCard,
  StyledCardTitle,
  StyledBadge,
  StyledCardText,
  StyledImage,
} from './Submissions.styled';
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

  const dispatch = useAppDispatch();

  useEffect(() => {
    submissions.forEach((submission) => {
      if (submission.isNew) {
        setTimeout(() => {
          dispatch(markSubmissionAsSeen(submission.id));
        }, 3000);
      }
    });
  }, [submissions, dispatch]);
  return (
    <StyledMain>
      <h1>React Forms</h1>
      <StyledButton ref={openButtonRef} onClick={() => setIsModalOpen(true)}>
        Open Uncontrolled Form
      </StyledButton>
      <StyledButton onClick={() => setIsReactHookFormOpen(true)}>
        Open React Hook Form
      </StyledButton>
      <Modal isOpen={isReactHookFormOpen} onClose={handleCloseReactHookForm}>
        <ReactHookForm onSuccess={handleCloseReactHookForm} />
      </Modal>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <UncontrolledForm onSuccess={handleCloseModal} />
      </Modal>
      <StyledSubmissions>
        <h2>Submitted Forms ({submissions.length})</h2>

        <StyledCards>
          {submissions.map((submission) => (
            <StyledCard key={submission.id} $isNew={submission.isNew}>
              <StyledImage src={submission.imageBase64} alt={submission.name} />

              <StyledCardTitle>
                {submission.name}

                {submission.isNew && <StyledBadge>NEW</StyledBadge>}
              </StyledCardTitle>
              <p>Created: {new Date(submission.createdAt).toLocaleString()}</p>

              <StyledCardText>Age: {submission.age}</StyledCardText>

              <StyledCardText>Email: {submission.email}</StyledCardText>

              <StyledCardText>Gender: {submission.gender}</StyledCardText>

              <StyledCardText>Country: {submission.country}</StyledCardText>
            </StyledCard>
          ))}
        </StyledCards>
      </StyledSubmissions>
    </StyledMain>
  );
}
export default App;
