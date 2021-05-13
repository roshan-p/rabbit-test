const getLocations = async () =>  {
    const rawResponse = await fetch('https://5efabb3a80d8170016f758ee.mockapi.io/locations', {
        method: 'GET'
      });
      const content = await rawResponse.json();
    
      return content;
  }

  export default  getLocations;