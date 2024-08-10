import { useRouter } from 'next/router';  
import { useEffect, useState } from 'react';  
import {  
  Box,  
  Button,  
  Input,  
  FormControl,  
  FormLabel,  
  List,  
  ListItem,  
  Container,
  Icon
} from '@chakra-ui/react';  

import { CheckCircleIcon } from '@chakra-ui/icons';

const UserDetails = () => {  
  const router = useRouter();  
  const { id } = router.query;  
  const [user, setUser] = useState(null);  
  const [posts, setPosts] = useState([]);  
  const [newPost, setNewPost] = useState({ title: '', body: '' });  

  const token =  'fb3c7a28c2fcf2734c9183f0db0f112c76ccf5cb5329dd65621eca61e80d8a51';

  // Fetch user details and posts  
  useEffect(() => {  
    const fetchUserDetails = async () => {  
      if (!id) return;  
      const userRes = await fetch(`https://gorest.co.in/public/v2/users/${id}`);  
      const userData = await userRes.json();  
      setUser(userData);  

      const postsRes = await fetch(`https://gorest.co.in/public/v2/users/${id}/posts`);  
      const postsData = await postsRes.json();  
      setPosts(postsData);  
    };  

    fetchUserDetails();  
  }, [id]);  

  fetch('https://gorest.co.in/public/v2/users', {  
    method: 'GET', 
    headers: {  
      'Authorization': `Bearer ${token}`, 
      'Content-Type': 'application/json',  
    },  
  })  
  .then(response => response.json())  
  .then(data => console.log(data))  
  .catch(error => console.error('Error:', error));  

  // Create a new post  
  const handleCreatePost = async () => {  
    const res = await fetch(`https://gorest.co.in/public/v2/users/${id}/posts`, {  
      method: 'POST',  
      headers: {  
        'Content-Type': 'application/json',  
        'Authorization': `Bearer ${token}`, // My created token
      },  
      body: JSON.stringify(newPost),  
    });  
    const data = await res.json();  
    setPosts([...posts, data]);  
    setNewPost({ title: '', body: '' });
  };  

  return (  
    <Container mt="5">
    <Box w="100%" h="100%" margin={'auto'} background="gray.100" borderRadius={'10'} boxShadow={'revert'} padding={6}>  
      {user && <h1 bg="blue.50" style={{ display: 'flex', alignItems: 'center', fontSize: '20px' }}><Icon as={CheckCircleIcon} mr={2} color="green.400"/>{user.name}</h1>}  
      <FormControl bg="blue.100" borderRadius="10px" padding={5} my={3}>  
        <FormLabel fontSize={15}>Title</FormLabel>  
        <Input  
          value={newPost.title}  
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}  
          background={'white'}
          _focusVisible={{ borderColor: 'blue.600'}}
        />  
        <FormLabel fontSize={15} mt={4}>Message</FormLabel>  
        <Input  
          value={newPost.body}  
          onChange={(e) => setNewPost({ ...newPost, body: e.target.value })}  
          background={'white'}
          _focusVisible={{ borderColor: 'blue.600'}}
        />  
        <Button onClick={handleCreatePost} _hover={{ bg: 'blue.600', color: 'white' }} variant='outline' bg="blue.300" my="20px">Create Post</Button>  
      </FormControl>  
      <List>  
        {posts.map((post) => (  
          <ListItem key={post.id} bg="gray.50" borderRadius={5} p={4} mb={2}>  
            <h2 style={{ fontWeight: 'bold', fontSize: '16px' }}>{post.title}</h2>  
            <p style={{ color: 'gray', fontSize: 14 }}>{post.body}</p>  
          </ListItem>  
        ))}  
      </List>  
    </Box>  
    </Container>
  );  
};  

export default UserDetails;