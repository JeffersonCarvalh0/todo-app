import React, { useState } from 'react';
import styled from 'styled-components';
import { MdEdit, MdCancel } from 'react-icons/md';

const Background = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.colors.lightAccent};
  color: ${(props) => props.theme.colors.background};
  overflow-wrap: break-word;
  flex-direction: column;
  justify-content: start;
  padding: 20px;
  min-width: 30vw;
  max-width: 80vw;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
`;

const Title = styled.h4`
  margin: 0;
`;

const EditableTitle = styled.input`
  margin: 0;
  background-color: ${(props) => props.theme.colors.lightAccent};
  font-weight: bold;
  transition: border-color 250ms ease;
  border: none;
  border-bottom: 2px solid;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.accent};
  }
`;

const Description = styled.p`
  margin: 0;
`;

const EditableDescription = styled.textarea`
  margin: 0;
  background-color: ${(props) => props.theme.colors.lightAccent};
  transition: border-color 250ms ease;
  border: none;
  border-bottom: 2px solid;
  resize: none;

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.accent};
  }
`;

const EditIcon = styled(MdEdit)`
  align-self: flex-end;

  &:active {
    transform: translate(2px, 2px);
  }
`;

const CancelIcon = styled(MdCancel)`
  align-self: flex-end;

  &:active {
    transform: translate(2px, 2px);
  }
`;

interface Props {
  title: string;
  description: string;
}

const TodoCard = ({ title, description }: Props) => {
  const [editMode, setEditMode] = useState(false);
  const [formState, setFormState] = useState({
    title: title,
    description: description,
  });

  const toggleEditMode = () => setEditMode((prevEditMode) => !prevEditMode);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormState((prevFormState: Props) => ({
      ...prevFormState,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <Background>
      {editMode ? (
        <>
          <CancelIcon onClick={toggleEditMode} />
          <EditableTitle
            name="title"
            value={formState.title}
            onChange={handleChange}
          />
          <EditableDescription
            name="description"
            value={formState.description}
            onChange={handleChange}
          />
        </>
      ) : (
        <>
          <EditIcon onClick={toggleEditMode} />
          <Title>{formState.title}</Title>
          <Description>{formState.description}</Description>
        </>
      )}
    </Background>
  );
};

export default TodoCard;
