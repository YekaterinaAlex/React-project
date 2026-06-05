import { useState, useRef } from 'react';

import { useAppSelector } from './store/hooks';

import Modal from './components/Modal';
import UncontrolledForm from './forms/UncontrolledForm/UncontrolledForm';

import {
  StyledCards,
  StyledSubmissions,
  StyledCard,
  StyledCardTitle,
  StyledBadge,
  StyledCardText,
  StyledImage,
} from './Submissions.styled';
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
        <UncontrolledForm onSuccess={handleCloseModal} />
      </Modal>
      <StyledSubmissions>
        <h2>Submitted Forms</h2>

        <StyledCards>
          {submissions.map((submission) => (
            <StyledCard key={submission.id}>
              <StyledImage src={submission.imageBase64} alt={submission.name} />

              <StyledCardTitle>
                {submission.name}

                {submission.isNew && <StyledBadge>NEW</StyledBadge>}
              </StyledCardTitle>

              <StyledCardText>Age: {submission.age}</StyledCardText>

              <StyledCardText>Email: {submission.email}</StyledCardText>

              <StyledCardText>Gender: {submission.gender}</StyledCardText>

              <StyledCardText>Country: {submission.country}</StyledCardText>
            </StyledCard>
          ))}
        </StyledCards>
      </StyledSubmissions>
    </main>
  );
}
export default App;
