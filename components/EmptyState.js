import React from 'react';
import { Heading, Flex, Text } from '@chakra-ui/core';

import AddSiteModal from './AddSiteModal';

const EmptyState = () => {
  return (
    <Flex width="100%" backgroundColor="white" borderRadius="8px" p={16} align="center" justify="center" direction="column">
      <Heading size="md" mb={2}>You haven’t added any sites.</Heading>
      <Text mb={4}>Let’s get started.</Text>
      <AddSiteModal>
        + Add Site
      </AddSiteModal>
    </Flex>
  );
};

export default EmptyState;
