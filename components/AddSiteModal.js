import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { mutate } from 'swr';

import { Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  useDisclosure,
  useToast,
} from '@chakra-ui/core';

import { createSite } from '@/lib/db';
import { useAuth } from '@/lib/auth';

export default function AddSiteModal({ children }) {
  const toast = useToast();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const initialRef = useRef();

  const auth = useAuth();

  const { handleSubmit,  register } = useForm();

  function onCreateSite({ name, url }) {
    const newSite = {
      authorId: auth.user.uid,
      createdAt: new Date().toISOString(),
      name,
      url,
    };

    const { id } = createSite(newSite);

    toast({
      title: 'Success!',
      description: "We've added your site.",
      status: 'success',
      duration: 5000,
      isClosable: true,
    });

    mutate(
      ['/api/sites', auth.user.token],
      async (data) => ({ sites: [...data.sites, { id, ...newSite }] }),
      false
    );

    onClose();
  }

  return (
    <>
      <Button
        bg="gray.900"
        color="white"
        fontWeight="medium"
        _hover={{ bg: 'gray.700' }}
        _active={{
          bg: 'gray.800',
          transform: 'scale(0.95)'
        }}
        onClick={onOpen}
      >
        {children}
      </Button>

      <Modal
        initialFocusRef={initialRef}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onCreateSite)}>
          <ModalHeader fontWeight="bold">Add site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input
                placeholder="My site"
                name="name"
                ref={register({
                  required:'Required'
                })}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Input
                placeholder="https://website.com"
                name="url"
                ref={register({
                  required:'Required'
                })}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button fontWeight="medium" mr={3} onClick={onClose}>Cancel</Button>
            <Button
              background="#99fffe"
              color="#194d4c"
              fontWeight="medium"
              type="submit"
            >
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}