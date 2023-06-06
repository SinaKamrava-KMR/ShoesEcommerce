export class Request{

  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async get(endpoint) {
    
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`);
      if (!response.ok) throw new Error('User not found !!!');

      const result = await response.json();
      return result;

    } catch (error) {
      throw error;
    }


  }

}