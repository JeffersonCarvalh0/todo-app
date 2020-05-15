import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import {
  MdEdit,
  MdCancel,
  MdSave,
  MdDone,
  MdDelete,
  MdSettingsBackupRestore,
} from 'react-icons/md';
import { Formik, Field } from 'formik';
import * as Yup from 'yup';

import server from '../../api';

const Background = styled.div`
  display: flex;
  background-color: ${(props) => props.theme.colors.lightAccent};
  color: ${(props) => props.theme.colors.background};
  overflow-wrap: break-word;
  flex-direction: column;
  justify-content: start;
  padding: 20px;
  margin: 10px;
  min-width: 30vw;
  max-width: 80vw;
  border-radius: 10px;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.5);
`;

const Title = styled.h4`
  margin: 0;
`;

const Description = styled.p`
  margin: 0;
`;

const Caption = styled.p`
  margin: 0;
  margin-right: 5px;
  font-size: small;
`;

const EditableTitle = styled(Field)<{ isErrored: boolean }>`
  margin: 0;
  background-color: ${(props) => props.theme.colors.lightAccent};
  font-weight: bold;
  transition: border-color 250ms ease;
  border: none;
  border-bottom: 2px solid;
  border-color: ${(props) =>
    props.isErrored
      ? props.theme.colors.red
      : props.theme.colors.backgroundColor};

  &:focus {
    outline: none;
    border-color: ${(props) => props.theme.colors.accent};
  }
`;

const EditableDescription = styled(EditableTitle)`
  resize: none;
  font-weight: normal;
`;

const TopIconsRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  width: 100%;
`;

const BottomRow = styled(TopIconsRow)`
  justify-content: space-between;
  margin-top: 30px;
`;

const IconBase = css`
  &:active {
    transform: translate(2px, 2px);
  }
`;

const EditIcon = styled(MdEdit)`
  ${IconBase}
`;

const CancelIcon = styled(MdCancel)`
  ${IconBase}
  margin-left: 10px;
`;

const SaveIcon = styled(MdSave)`
  ${IconBase}
`;

const DeleteIcon = styled(MdDelete)`
  ${IconBase}
  color: ${(props) => props.theme.colors.error};
`;

const IconButton = styled.button`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  text-align: center;
  background-color: inherit;
  border: none;
  border-radius: 8px;
  box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.5);

  &:focus {
    outline: none;
  }

  &:active {
    transform: translate(2px, 2px);
  }
`;

interface Props {
  todo: {
    title: string;
    description: string;
    id?: number;
    done: boolean;
  };
  onEditCancel?: Function;
  onSave?: Function;
}

const TodoCard = ({ todo, onEditCancel, onSave }: Props) => {
  const [currentTodo, setCurrentTodo] = useState(todo);
  const [editMode, setEditMode] = useState(currentTodo.id ? false : true);

  const toggleEditMode = () => setEditMode((prevEditMode) => !prevEditMode);

  const deleteTodo = async () => {
    server.delete(`/todo/${currentTodo.id}`).then((response) => {
      if (response.status === 200) {
        setCurrentTodo(response.data.data);
      }
    });
  };

  const toggleDone = async () => {
    server
      .put(`todo/${currentTodo.id}`, { done: !currentTodo.done })
      .then((response) => {
        if (response.status === 200) {
          setCurrentTodo(response.data.data);
        }
      });
  };

  return (
    <Background>
      <Formik
        initialValues={{
          Title: currentTodo.title,
          Description: currentTodo.description,
        }}
        validationSchema={Yup.object({
          Title: Yup.string().required(),
          Description: Yup.string().required(),
        })}
        onSubmit={async (values, { setStatus }) => {
          const body = {
            title: values.Title,
            description: values.Description,
          };

          (currentTodo.id
            ? server.put(`/todo/${currentTodo.id}`, body)
            : server.post('/todo', body)
          )
            .then((response) => {
              if (response.status === 200) {
                setCurrentTodo(response.data.data);
              }
            })
            .catch((error) => {
              if (error.response) {
                setStatus(error.response.data.message);
              }
            });
        }}
      >
        {(formik) =>
          editMode ? (
            <>
              <TopIconsRow>
                <SaveIcon
                  onClick={() => {
                    formik.handleSubmit();
                    setEditMode(false);
                    if (onSave) onSave();
                  }}
                />
                <CancelIcon
                  onClick={() => {
                    formik.handleReset();
                    toggleEditMode();
                    if (onEditCancel) onEditCancel();
                  }}
                />
              </TopIconsRow>

              <EditableTitle
                name="Title"
                isErrored={formik.errors.Title}
                placeholder="Title"
              />

              <EditableDescription
                name="Description"
                component="textarea"
                isErrored={formik.errors.Description}
                placeholder="Description"
              />

              {currentTodo.id && (
                <BottomRow>
                  <IconButton onClick={deleteTodo}>
                    <Caption> Delete Todo </Caption>
                    <DeleteIcon />
                  </IconButton>
                  <IconButton
                    onClick={async () => {
                      await toggleDone();
                      if (onSave) onSave();
                    }}
                  >
                    <Caption>
                      {currentTodo.done ? 'Mark as undone' : 'Mark as done'}
                    </Caption>
                    {currentTodo.done ? (
                      <MdSettingsBackupRestore />
                    ) : (
                      <MdDone />
                    )}
                  </IconButton>
                </BottomRow>
              )}
            </>
          ) : (
            <>
              <TopIconsRow>
                <EditIcon onClick={toggleEditMode} />
              </TopIconsRow>
              <Title>{formik.values.Title}</Title>
              <Description>{formik.values.Description}</Description>
            </>
          )
        }
      </Formik>
    </Background>
  );
};

export default TodoCard;
