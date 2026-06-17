import { useEffect, useState } from 'react';

import type { FormSubmission } from '../../types/form.types';

import {
  StyledBadge,
  StyledCard,
  StyledCardText,
  StyledCardTitle,
  StyledImage,
} from '../../Submissions.styled';

type SubmissionCardProps = {
  submission: FormSubmission;
};

function SubmissionCard({ submission }: SubmissionCardProps) {
  const [isHighlighted, setIsHighlighted] = useState(submission.isNew);

  useEffect(() => {
    if (!submission.isNew) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setIsHighlighted(false);
    }, 3000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [submission.id, submission.isNew]);

  return (
    <StyledCard $isNew={isHighlighted}>
      <StyledImage src={submission.imageBase64} alt={submission.name} />

      <StyledCardTitle>
        {submission.name}
        {isHighlighted && <StyledBadge>NEW</StyledBadge>}
      </StyledCardTitle>

      <StyledCardText>Age: {submission.age}</StyledCardText>
      <StyledCardText>Email: {submission.email}</StyledCardText>
      <StyledCardText>Gender: {submission.gender}</StyledCardText>
      <StyledCardText>Country: {submission.country}</StyledCardText>
      <StyledCardText>
        Created: {new Date(submission.createdAt).toLocaleString()}
      </StyledCardText>
    </StyledCard>
  );
}

export default SubmissionCard;
