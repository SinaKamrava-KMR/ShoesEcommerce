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

  async getByFilter(endpoint, filter) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}?q=${filter}`);
      if (!response.ok) throw new Error('User not found !!!');

      const result = await response.json();
      return result;

    } catch (error) {
      throw error;
    }
  }
  async getById(endpoint, id) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}?id=${id}`);
      if (!response.ok) throw new Error('User not found !!!');

      const result = await response.json();
      return result;

    } catch (error) {
      throw error;
    }
  }

  async post(endpoint,data) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          'content-type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('can not post producy !!!');

      const result = await response.json();
      return result;

    } catch (error) {
      throw error;
    }
  }

  async delete(endpoint,id) {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}?id=${id}`, {
        method: "DELETE",
        headers: {
          'content-type': 'application/json'
        }
      });
      if (!response.ok) throw new Error('can not post producy !!!');

      const result = await response.json();
      return result;

    } catch (error) {
      throw error;
    }
  }

}