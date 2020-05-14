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
import ReactLoading from 'react-loading';

import server from '../../api';

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

const Overlay = styled.div`
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 2;
`;

const StyledLoading = styled(ReactLoading)`
  display: block;
  margin: auto;
  text-align: center;
  width: 10vw;
  height: 10vh;
`;

interface Props {
  title: string;
  description: string;
  id?: number;
  done: boolean;
}

const TodoCard = ({ title, description, id, done }: Props) => {
  const [editMode, setEditMode] = useState(false);
  const toggleEditMode = () => setEditMode((prevEditMode) => !prevEditMode);

  return (
    <Background>
      <Formik
        initialValues={{
          Title: title,
          Description: description,
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

          (id ? server.put(`/todo/${id}`, body) : server.post('/todo', body))
            .then((response) => {
              if (response.status === 200) {
                // Update the local todo data
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
          formik.isSubmitting ? (
            <Overlay>
              <StyledLoading type="bubbles" />
            </Overlay>
          ) : editMode ? (
            <>
              <TopIconsRow>
                <SaveIcon onClick={() => formik.handleSubmit()} />
                <CancelIcon
                  onClick={() => {
                    formik.handleReset();
                    toggleEditMode();
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
              <BottomRow>
                <IconButton>
                  <Caption> Delete Todo </Caption>
                  <DeleteIcon />
                </IconButton>
                <IconButton>
                  <Caption>{done ? 'Mark as undone' : 'Mark as done'}</Caption>
                  {done ? <MdSettingsBackupRestore /> : <MdDone />}
                </IconButton>
              </BottomRow>
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
