const postCart = async (data) =>  {
    const rawResponse = await fetch('https://5efabb3a80d8170016f758ee.mockapi.io/cart', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      const content = await rawResponse.json();
      alert(content)
    
      return content;
  }

  export default  postCart;