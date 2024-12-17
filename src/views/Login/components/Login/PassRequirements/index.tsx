import React from 'react';
import { Container, Requirement, Text } from './style';
import { Requirements } from 'src/utils/LoginUtil';

interface Props {
  validations?: Array<string>;
  requirements: Array<Requirements>;
  inline?: boolean;
}

export const PassRequirements: React.FC<Props> = ({
  validations,
  requirements,
  inline = false,
}) => {
  return (
    <Container inline={inline}>
      {requirements.map((requirement: Requirements) => (
        // eslint-disable-next-line react/jsx-key
        <Requirement>
          <img
            alt="validation"
            src={
              validations?.includes(requirement.type) ? './green_circle.png' : './white_circle.png'
            }
          />
          <Text validation={validations?.includes(requirement.type)}>{requirement.name}</Text>
        </Requirement>
      ))}
    </Container>
  );
};
