const verifyToken = async () => {
    const token = localStorage.getItem('userToken');
    if (!token) {
      return false;
    }

    try {
      const response = await fetch('http://localhost:12345/api/tokens/verifyToken', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.ok) {
        const data = await response.json();
        return data.isValid;
      } else {
        return false;
      }
    } catch (error) {
      console.error('Error verifying token:', error);
      return false;
    }
  }
  
  export default verifyToken;
  