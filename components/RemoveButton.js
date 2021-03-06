import React, { useState, useRef } from 'react';
import { mutate } from 'swr';
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
  IconButton,
} from "@chakra-ui/core";

import { deleteFeedback } from "@/lib/db";
import { useAuth } from '@/lib/auth';

export default function RemoveButton({ feedbackId }) {
  const [isOpen, setIsOpen] = useState();
  const cancelRef = useRef();

  const auth = useAuth();
  
  const onClose = () => setIsOpen(false);

  function onDelete() {
    deleteFeedback(feedbackId);
    mutate(
      ['/api/feedback', auth.user.token],
      async data => {
        const filtered = data.feedback.filter(feedback => feedback.id !== feedbackId);

        return { feedback: filtered };
      },
      false,
    )
    onClose();
  }

  return (
    <>
      <IconButton
        aria-label="Delete feedback"
        icon="delete"
        onClick={() => setIsOpen(true)}
        variant="ghost"
      />

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Feedback
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You can't undo this action afterwards.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button variantColor="red" onClick={onDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}