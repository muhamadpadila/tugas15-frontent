import React, { useEffect, useState } from 'react';
import {
  Flex,
  Heading,
  Box,
  Stack,
  Text,
  Spinner,
  Button,
  Center,
  useColorMode,
} from '@chakra-ui/react';

const Hero = () => {
  const { colorMode } = useColorMode();
  const [movie, setMovie] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getDataApi() {
    const url = "https://www.omdbapi.com/?apikey=fcf50ae6&i=tt2975590";

    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Gagal mengambil data");
      }

      const data = await response.json();
      setMovie(data);
    } catch (error) {
      console.error("Error mengambil data:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getDataApi();
  }, []);

  if (loading) {
    return (
      <Flex minH={'100vh'} justify={'center'} align={'center'}>
        <Spinner size="xl" />
      </Flex>
    );
  }

  if (error) {
    return (
      <Flex minH={'100vh'} justify={'center'} align={'center'}>
        <Box>
          <Text color={'red.500'}>Error mengambil data: {error.message}</Text>
        </Box>
      </Flex>
    );
  }

  return (
    <Flex minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
      <Stack
        p={8}
        flex={1}
        align={'center'}
        justify={'center'}
        color={'white'}
        bg={colorMode === 'light' ? 'gray.800' : 'white'}
      >
        <Stack spacing={6} w={'full'} maxW={'lg'}>
          <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }} mb={4} textAlign={'center'}>
            <Text color={'red.400'} as={'span'}>
              {movie.Title}
            </Text>{' '}
            <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.400'}>
              {movie.Genre}
            </Text>
            <Text fontSize={{ base: 'sm', md: 'md' }} color={'gray.500'}>
              {movie.Plot}
            </Text>
          </Heading>
          <Stack direction={{ base: 'column', md: 'row' }} spacing={4} mt={6}>
            <Button
              colorScheme={colorMode === 'light' ? 'red' : 'blue'}
              variant='solid'
              size="lg"
              color={colorMode === 'light' ? 'white' : 'black'}
            >
              Tonton
            </Button>
            <Button
              colorScheme={colorMode === 'light' ? 'green' : 'purple'}
              variant='solid'
              size="lg"
              color={colorMode === 'light' ? 'white' : 'black'}
            >
              Trailer
            </Button>
          </Stack>
        </Stack>
      </Stack>
      <Center
        flex={1}
        justify={'center'}
        align={'center'}
        overflow={'hidden'}
        borderRadius="md"
        boxShadow="md"
        mt={{ base: '4', md: '0' }}
      >
        <Box
          as="img"
          alt={movie.Title}
          src={movie.Poster}
          objectFit={'cover'}
          width={{ base: '100%', md: 'auto' }}
          height={'auto'}
        />
      </Center>
    </Flex>
  );
};

export default Hero;
