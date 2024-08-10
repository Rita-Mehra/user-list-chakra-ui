import { useEffect, useState } from 'react';  
import {  
  Box,  
  Button,  
  Heading,  
  Input,  
  List,  
  ListItem,  
  FormControl,  
  FormLabel,
  Container,  
  Icon
} from '@chakra-ui/react';  

const API_URL = 'https://gorest.co.in/public/v2/users';  



export default function Home() {  
  const [users, setUsers] = useState([]);  
  const [newUser, setNewUser] = useState({ name: '', email: '' });  
  const token =  'fb3c7a28c2fcf2734c9183f0db0f112c76ccf5cb5329dd65621eca61e80d8a51';

  useEffect(() => {  
    const fetchUsers = async () => {  
      const res = await fetch(API_URL);  
      const data = await res.json();  
      setUsers(data);  
    };  

    fetchUsers();  
  }, []);  

  // Create a new user  
  const handleCreateUser = async () => {  
    const res = await fetch(API_URL, {  
      method: 'POST',  
      headers: {  
        'Content-Type': 'application/json',  
        'Authorization': `Bearer ${token}`, // This is my generated token 
      },  
      body: JSON.stringify(newUser),  
    });  
    const data = await res.json();  
    setUsers([...users, data]);  
    setNewUser({ name: '', email: '' }); 
  };  

  return (  
    <Container mt="5">
    <Box w="100%" h="100%" margin={'auto'} background="gray.100" borderRadius={'10'} boxShadow={'revert'} padding={6}>  
      <Heading color="purple.300" fontSize={24}>Add User</Heading>  
      <FormControl bg="purple.100" borderRadius="10px" padding={5} my={3}>  
        <FormLabel fontSize={15}>Name</FormLabel>  
        <Input  
          value={newUser.name}  
          onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}  
          background={'white'}
          _focusVisible={{ borderColor: 'purple.600'}}
        />  
        <FormLabel fontSize={15} mt={4}>Email</FormLabel>  
        <Input  
          value={newUser.email}  
          onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
          background={'white'} 
          _focusVisible={{ borderColor: 'purple.600'}} 
        />  
        <Button _hover={{ bg: 'purple.600', color: 'white' }} variant='outline' bg="purple.300" my="20px" onClick={handleCreateUser}>Create User</Button>  
      </FormControl>  

      <Heading color="purple.300" mt={5} fontSize={24}>User List</Heading>  
      <List>  
        {users.map((user) => (  
          <ListItem display="flex" _hover={{ bg: 'purple.100' }} alignItems='center' boxShadow='base' bg='gray.200' borderRadius={5} px={2} cursor={'pointer'} my={2} key={user.id}>  
          <Icon viewBox='0 0 200 200' color='purple.800' mr='5px'>
            <path
              fill='currentColor'
              d='M 100, 100 m -75, 0 a 75,75 0 1,0 150,0 a 75,75 0 1,0 -150,0'
            />
          </Icon>
            <a 
             style={{
              display: 'block',
              width:'100%',
              fontSize: '14px'
             }}
             href={`/user/${user.id}`}>{user.name}</a>  
          </ListItem>  
        ))}  
      </List>  
    </Box>  
    </Container>
  );  
}