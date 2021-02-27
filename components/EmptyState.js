import React from 'react';
import { Heading, Flex, Text, Button } from '@chakra-ui/core';

import DashboardShell from './DashboardShell';
import AddSiteModal from './AddSiteModal';

const EmptyState = () => {
  return (
    <DashboardShell>
      <Flex width="100%" backgroundColor="white" borderRadius="8px" p={16} align="center" justify="center" direction="column">
        <Heading size="md" mb={2}>You haven’t added any sites.</Heading>
        <Text mb={4}>Let’s get started.</Text>
        <AddSiteModal />
      </Flex>
    </DashboardShell>
  );
};

export default EmptyState;
